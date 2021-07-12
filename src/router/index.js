import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '../views/Dashboard.vue'
import SimpleDashboard from '../views/SimpleDashboard'
// import About from '../views/About'




import Login from '../components/Login.vue'
import NavBar from '../components/NavBar.vue'
import Technical from '../components/TechnicalDocumentation/Technical.vue'

import Technology from '../components/Dashboard/Technology.vue'
import Theme from '../components/Dashboard/Theme.vue'
import Folder from '../components/Dashboard/Folder.vue'
import Admin from '../components/Dashboard/Admin.vue'
import Manager from '../components/Dashboard/Manager.vue'
import User from '../components/Dashboard/User.vue'








const routes = [{
        path: '/Dashboard',
        name: 'Dashboard',
        beforeEnter: guardMyroute,

        component: Dashboard
    },
    {
        path: '/about',
        name: 'About',
        beforeEnter: guardMyroute,

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
        beforeEnter: guardMyroute,

        component: NavBar
    },
    {
        path: '/SimpleDashboard',
        name: 'SimpleDashboard',
        beforeEnter: guardMyroute,


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
        beforeEnter: guardMyroute,
        component: Technical
    },

    {
        path: '/Login',
        name: 'Login',
        component: Login
    },
    {
        path: '/Technology',
        name: 'Technology',
        beforeEnter: guardMyroute,

        component: Technology
    },
    {
        path: '/Theme',
        name: 'Theme',
        beforeEnter: guardMyroute,

        component: Theme
    },
    {
        path: '/Folder',
        name: 'Folder',
        beforeEnter: guardMyroute,

        component: Folder
    },
    {
        path: '/Admin',
        name: 'Admin',
        beforeEnter: guardMyroute,

        component: Admin
    },

    {
        path: '/Manager',
        name: 'Manager',
        beforeEnter: guardMyroute,

        component: Manager
    },
    {
        path: '/User',
        name: 'User',
        beforeEnter: guardMyroute,

        component: User
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

function guardMyroute(to, from, next) {

    var isAuthenticated = localStorage.getItem('token') != null;

    if (isAuthenticated) {
        next(); // allow to enter route
    } else {
        next('/login'); // go to '/login';
    }
}
export default router