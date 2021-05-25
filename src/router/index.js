import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import HelloWorld from '../components/HelloWorld.vue'
import Prime from '../components/Prime.vue'

import MyHome from '../components/MyHome.vue'
import NavBar from '../components/NavBar.vue'
import Technical from '../components/TechnicalDocumentation/Technical.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/HelloWorld',
        name: 'HelloWorld',
        component: HelloWorld
    },

    {
        path: '/Prime',
        name: 'Prime',
        component: Prime
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/NavBar',
        name: 'NavBar',
        component: NavBar
    },
    {
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/Technical',
        name: 'Technical',
        component: Technical
    },

    {
        path: '/MyHome',
        name: 'MyHome',
        component: MyHome
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router