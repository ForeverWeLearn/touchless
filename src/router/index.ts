import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CustomizeView from '../views/CustomizeView.vue'
import AboutView from '../views/AboutView.vue'
import Experiment from '../views/Experimental.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/customize',
            name: 'customize',
            component: CustomizeView,
        },
        {
            path: '/about',
            name: 'about',
            component: AboutView,
        },
        {
            path: '/experimental',
            name: 'experimental',
            component: Experiment,
        },
    ],
})

export default router
