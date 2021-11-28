import { createRouter, createWebHistory } from 'vue-router'

import Login from '../views/login/index.vue'
import Home from '../views/home/index.vue'
import Layout from '../views/layout/index.vue'
import ChangePassword from '../views/account/password.vue'
import Version from '../views/account/version.vue'
import Dashborad from '../views/home/dashborad.vue'


const routerHistory = createWebHistory()
// const routerHistory = createWebHashHistory()

const router = createRouter({
    history: routerHistory,
    routes: [
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/main',
            component: Layout,
            children: [
                {
                    path: '/dashborad',
                    component: Dashborad
                },
                {
                    path: '/home',
                    component: Home
                },
                {
                    path: '/change-password',
                    component: ChangePassword
                },
                {
                    path: '/version',
                    component: Version
                }
            ]
        }
    ]
})

export default router