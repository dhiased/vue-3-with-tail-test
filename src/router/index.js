import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SimpleDashboard from '../views/SimpleDashboard'
// import About from '../views/About'




import MyHome from '../components/MyHome.vue'
import NavBar from '../components/NavBar.vue'
import Technical from '../components/TechnicalDocumentation/Technical.vue'

import Technology from '../components/Dashboard/Technology.vue'
import Theme from '../components/Dashboard/Theme.vue'
import Folder from '../components/Dashboard/Folder.vue'




const routes = [{
        path: '/Dashboard',
        name: 'Dashboard',
        component: Dashboard
    },
    {
        path: '/about',
        name: 'About',
        component: () =>
            import ('../views/About.vue')
    },



    {
        // path: '/about',
        // name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () =>
        //     import ( /* webpackChunkName: "about" */ '../views/About.vue')
    },
    {
        path: '/NavBar',
        name: 'NavBar',
        component: NavBar
    },
    {
        path: '/SimpleDashboard',
        name: 'SimpleDashboard',

        component: SimpleDashboard,

        // children: [
        // {
        //     path: '',
        //     component: () =>
        //         import ( /* webpackChunkName: "Overview" */ '../views/Home.vue')
        // },
        // {
        //     path: 'about',
        //     component: () =>
        //         import ( /* webpackChunkName: "Messages" */ '../views/About.vue')
        // },
        // { path: '', name: 'Home', component: Home },
        // {
        //     path: 'about',
        //     name: 'about',
        //     component: About,
        // },

        // ]
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