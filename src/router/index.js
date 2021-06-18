import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'



import MyHome from '../components/MyHome.vue'
import NavBar from '../components/NavBar.vue'
import Technical from '../components/TechnicalDocumentation/Technical.vue'
import Dashboard from '../components/Dashboard/Dashboard.vue'
import Technology from '../components/Dashboard/Technology.vue'
import Theme from '../components/Dashboard/Theme.vue'
import Folder from '../components/Dashboard/Folder.vue'




const routes = [{
        path: '/',
        name: 'Home',
        component: Home
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
        component: Dashboard,
        // children: [{
        //     path: '',
        //     component: () =>
        //         import ( /* webpackChunkName: "Overview" */ '../views/TechnologyCrud.vue')
        // }, ],
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
    {
        path: '/Technology',
        name: 'Technology',
        component: Technology
    },
    {
        path: '/Theme',
        name: 'Theme',
        component: Theme
    },
    {
        path: '/Folder',
        name: 'Folder',
        component: Folder
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router