import { createApp } from 'vue'
import App from './App.vue'

import UIKit from 'uikit'
import Icon from 'uikit/dist/js/uikit-icons'
import 'uikit/dist/css/uikit.min.css'

import router from './router'

import { get_token } from "./utils/auth";


// 路由判断登录 根据路由配置文件的参数
router.beforeEach((to, from, next) => {
    if (to.path === "/login"){ 
        if (get_token()) { // 判断当前的token是否存在 ； 登录存入的token
            next({
                path: '/dashborad'
            });
           } else {
            next();
           }
    }else{ // 判断该路由是否需要登录权限
     if (get_token()) { // 判断当前的token是否存在 ； 登录存入的token
      next();
     }
     else {
      next({
       path: '/login',
       // 将跳转的路由path作为参数，登录成功后跳转到该路由
       // query: {redirect: to.fullPath}
      })
     }
    }
   });


const app = createApp(App)

UIKit.use(Icon)

app.provide('uikit', UIKit)

app.use(router)

app.mount('#app')
