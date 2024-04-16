<template>
    <div class="w-full h-screen">
        <div class="w-full flex pt-3" style="height:8%;">
            <Navbar />
        </div>
        <div class="w-full flex flex-col items-center justify-center pt-8 pl-2" style="height:92%">
            <div v-if="message&&responseStatus == 200" class="mt-5 w-80 bg-green-100 p-2 rounded-lg border-2 border-green-600 text-center font-bold text-green-600">{{ message }}</div>
             <div v-else-if="message&&responseStatus == 500" class="mt-5 bg-red-100 p-2 rounded-lg border-2 border-red-600 text-center font-bold text-rose-600">{{message}}</div>
                <form class="max-w-sm mx-auto" @submit.prevent="createEvent">
                <div class="mb-5">
                    <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                        Event Name</label>
                    <input type="text" v-model="eventName"
                        class="shadow-sm border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Event Name" required />
                </div>
                <div class="mb-5">
                    <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Event
                       Description</label>
                    <input type="text" v-model="eventDesc"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        placeholder="Event Description"
                        required />
                </div>
                <div class="mb-5">
                    <label for="repeat-password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">From Date</label>
                    <input type="date" v-model="fromDate"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required />
                </div>

                <div class="mb-5">
                    <label for="repeat-password"
                        class="block mb-2 text-sm font-medium text-gray-900 dark:text-black">To Date</label>
                    <input type="date" v-model="toDate"
                        class="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5  dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required />
                </div>
                <button type="submit"
                    class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Create Event
                </button>
            </form>
        </div>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue';
import axios from 'axios';
import Navbar from '../Navbar.vue';

export default defineComponent({
    components: {
        Navbar
    },
    setup(){
        const eventName = ref('');
        const eventDesc = ref('');
        const fromDate = ref('');
        const toDate = ref('');
        const message = ref(''); 
        const responseStatus = ref(''); 

        const createEvent = async () => {
            try {
                const response = await axios.post('http://localhost:5000/eventsdetails', {
                    eventName: eventName.value,
                    eventDesc: eventDesc.value,
                    fromDate: fromDate.value,
                    toDate: toDate.value
                });
                message.value = response.data;
                responseStatus.value = response.status;
                 
            } catch (error) {
                console.error('Error creating event:', error);
            }
            setTimeout(() => {
                message.value = '';
            }, 10000);
        }
        return {
            eventName,
            eventDesc,
            fromDate,
            toDate,
            createEvent, 
            message,
            responseStatus
        };
    }
});
</script>