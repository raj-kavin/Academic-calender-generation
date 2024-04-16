    <template>
        <div class="w-full h-screen">
            <div class="w-full flex pt-3" style="height:8%;">
                <Navbar />
            </div>
            <div></div>
            <div class="w-full flex pt-8 pl-4" style="height:92%">
                <div class="w-1/5 pt-14">
                    <a-calendar @change="handleClick" style="width:300px;border:1px solid black;border-radius:4px;"
                        v-model:value="selectedDate" :fullscreen="false" />
                    <form class="flex flex-col gap-3 pt-10" @submit.prevent="">
                        <label for="">From Date</label>
                        <input type="date">
                        <label for="">To Date</label>
                        <input type="date">
                        <button class="border-blue-700 border-2 bg-blue-400 text-white pl-2 pr-2 pt-1 pb-1 rounded-lg"
                            type="submit">Generate</button>
                    </form>
                </div>
                <div class="w-4/5 h-full">
                    <div v-if="eventsDate.length == 0" class="w-full h-full flex flex-col items-center justify-center">
                        <div v-if="selectedDate === null" class="text-center mb-4 text-xl font-bold">There are no
                            programs on this date : {{
                                formatDate(currentDate) }}</div>
                        <div v-else class="text-center mb-4 text-xl font-bold">There are no
                            programs on this date : {{
                                formatDate(selectedDate) }}</div>

                        <div class="mb-4">If you want to create one, click the button below:</div>
                        <RouterLink to="/events">
                            <button
                                class="border-blue-700 border-2 bg-blue-400 text-white pl-2 pr-2 pt-1 pb-1 rounded-lg">Create
                                Events</button>
                        </RouterLink>
                    </div>
                    <div v-else-if="eventsDate.length != 0">
                        <div class="text-2xl pl-12 font-bold text-blue-700">List of Events</div>
                        <div class="mx-auto mt-4 w-4/5">
                            <div v-for="(event, index) in eventsDate" :key="index"
                                class="bg-white shadow-md rounded-md">
                                <!-- Card header -->
                                <div class="px-4 py-2 flex justify-between items-center cursor-pointer"
                                    @click="toggleCollapse(index)">
                                    <h3 class="text-lg font-semibold">{{ event.event_name }}</h3>
                                    <svg v-if="isCollapsed[index]" class="w-6 h-16 text-gray-600 transform rotate-180"
                                        fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                    <svg v-else class="w-6 h-6 text-gray-600" fill="none" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path d="M19 9l-7 7-7-7"></path>
                                    </svg>
                                </div>

                                <!-- Card content -->
                                <div v-show="!isCollapsed[index]" class="px-4 py-2 border-t">
                                    <p>{{ event.event_desc }}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <RouterView />
    </template>


<script>
import { defineComponent, ref, computed } from 'vue';
import { Calendar } from 'ant-design-vue';
import Navbar from '../Navbar.vue';
import axios from "axios";
import { onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import { useStore } from 'vuex';

export default defineComponent({
    components: {
        'a-calendar': Calendar,
        Navbar
    },

    setup() {
        const currentDate = new Date();
        const selectedDate = ref(null);
        const events = ref([]);
        const eventsDate = ref([]);
        const isCollapsed = ref([]);

        const fetchEvents = () => {
            axios.get("http://localhost:5000/events")
                .then((res) => {
                    events.value = res.data;
                    isCollapsed.value = Array(events.value.length).fill(true);
                    filterEventsByDate(currentDate);
                })
                .catch((err) => {
                    console.log('Error fetching events:', err);
                });
        };
        onMounted(fetchEvents);
        const toggleCollapse = (index) => {
            isCollapsed.value = isCollapsed.value.map((value, i) => i === index ? !value : true);
        };

        const formatDate = (date) => {
            if (!date) return '';
            const d = new Date(date);
            const day = d.getDate().toString().padStart(2, '0');
            const month = (d.getMonth() + 1).toString().padStart(2, '0');
            const year = d.getFullYear().toString();
            return `${day}-${month}-${year}`;
        };


        const filterEventsByDate = (date) => {

            const filteredEvents = events.value.filter(event => {
                const eventDate = new Date(event.from_date);
                return eventDate.toDateString() === date.toDateString();
            });

            eventsDate.value = filteredEvents;

        };



        const handleClick = () => {
            filterEventsByDate(selectedDate.value ? new Date(selectedDate.value) : null);
        };



        return {
            selectedDate,
            formatDate,
            handleClick,
            eventsDate,
            isCollapsed,
            toggleCollapse,
            currentDate
        };
    }
});

</script>