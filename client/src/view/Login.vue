<template>
    <div class="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div class="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
            <div class="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
                <div class="mt-12 flex flex-col items-center">
                    <h1 class="text-2xl xl:text-3xl font-extrabold">
                        Login
                    </h1>
                    <div class="w-full flex-1 mt-8">
                        <div class="mx-auto max-w-xs">
                            <GoogleLogin :callback="callback" prompt auto-login />
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex-1 bg-indigo-100 text-center hidden lg:flex">
                <div class="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                    style="background-image: url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg');">
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router';
import { GoogleLogin } from "vue3-google-login";
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import Cookies from 'js-cookie';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
    setup() {
        const router = useRouter();
        const store = useStore();

        onMounted(() => {
            store.dispatch('fetchUserData');
        });

        const userData = computed(() => store.state.userModule.userData);


        const callback = async (response) => {
            console.log("Logged in using Google");

            try {
                const axiosResponse = await axios.get("http://localhost:5000/login", {
                    headers: {
                        Authorization: response.credential
                    }
                });

                if (axiosResponse.data) {
                    Cookies.set('token', axiosResponse.data);

                    if (userData.value !== null) {
                        Cookies.set('userData', JSON.stringify(userData.value));
                        toast.success('Login successful', {
                            autoClose: 2000,
                            pauseOnHover: true,
                            position: 'top-right'
                        });

                        if (userData.value.role === 'admin') {
                            setTimeout(() => {
                                router.push('/home');
                            }, 3000);
                        } else {
                            setTimeout(() => {
                                router.push('/dashboard');
                            }, 3000);
                        }
                    }
                }

            } catch (error) {
                console.error("Error during login:", error);
                toast.error('Login failed', {
                    autoClose: 2000,
                    pauseOnHover: true,
                    position: 'top-right'
                });
            }
        };

        return {
            userData,
            callback
        };
    }
};

</script>
