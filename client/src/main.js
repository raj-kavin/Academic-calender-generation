import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from 'vue3-google-login'
import { createStore } from 'vuex';
import userModule from './view/modules/getUser.module'

const store = createStore({
    modules: {
        userModule
    }
});

export default store;


const CLIENT_ID = "984942748085-frkqjjofgj073sbedqs14826qt116qh4.apps.googleusercontent.com";

const app = createApp(App)

app.use(router)

app.use(store)

app.use(vue3GoogleLogin , {
    clientId:CLIENT_ID,
})

app.mount('#app')
