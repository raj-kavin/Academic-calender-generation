import { createRouter, createWebHistory } from 'vue-router'
import Events from '@/view/admin/Events.vue'
import Home from '@/view/admin/Home.vue'
import Login from '@/view/Login.vue'
import Landing from '@/view/faculty/Landing.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/home',
      name:'home',
      component : Home

    },
    {
      path: '/events',
      component : Events

    },{
      path:'/dashboard',
      component : Landing
    }
  ]
})

export default router
