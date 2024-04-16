<script>
import { RouterLink, RouterView , useRouter } from 'vue-router';
import Cookies from 'js-cookie';


export default{
    setup(){
    
        const dataString = Cookies.get('userData');
        const userdata = JSON.parse(dataString);
        const router = useRouter();
        const handleLogout = ()=>{
            Cookies.remove('userData');
            Cookies.remove('token');
            router.push('/');
        }
        return{
            userdata,
            handleLogout
        };
    }
}
</script>

<template>
    <div class="flex w-full h-full">
        <div class="w-1/5 flex items-center gap-3 justify-center">
            <img class="w-10 h-10" src="/calendar.png" alt="">
            <div class="text-xl font-bold text-blue-700">TimeWise</div>
        </div>
        <div class="w-4/5 flex">
            <div class="flex w-1/3 items-center justify-center gap-4">
                <input class="border-blue-700 border-2 rounded-lg p-2" type="text" style="width: 60%;height:60%"
                    placeholder="Search">
                <div class="border-blue-700 border-2 rounded-full p-1">
                    <img class="w-4 h-4" src="/magnifying-glass.png" alt="">
                </div>
            </div>
            <div class="w-2/3 gap-10 flex items-center justify-center">
                <div class="rounded-lg gap-2 flex items-center justify-center p-2">
                    <img class="w-6 h-6" src="/dashboard.png" alt="">
                    <RouterLink :class="{ 'active': $route.path === '/home' }" to="/home">Dashboard</RouterLink>
                </div>
                <div class="rounded-lg gap-2 flex items-center justify-center p-1">
                    <img class="w-6 h-6" src="/folder.png" alt="">
                    <RouterLink :class="{ 'active': $route.path === '/events' }" to="/events">Events</RouterLink>
                </div>
                <div class="rounded-lg gap-2 flex items-center justify-center p-1">
                    <img class="w-7 h-7" src="/out.png" alt="">
                    <div @click="handleLogout">Logout</div>
                </div>
                <div class="rounded-lg gap-2 flex items-center justify-center p-1">
                    <img class="w-6 h-6" src="/user.png" alt="">
                    <div>{{userdata.username}}</div>
                </div>
            </div>

        </div>
    </div>
    <RouterView />
</template>
<style>
.active {
    border-bottom: 4px solid #1c74bc;
}
</style>