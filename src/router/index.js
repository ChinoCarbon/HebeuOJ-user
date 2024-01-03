import Vue from 'vue'
import VueRouter from 'vue-router'
import Problems from "@/pages/Problems";
import HelloWorld from "@/components/HelloWorld";
import Problem from "@/pages/Problem";
import Login from "@/pages/Login";
import Regist from "@/pages/Regist";
import HelloWorld2 from "@/components/HelloWorld2";
import User from "@/pages/User";
import Judgement from "@/pages/Judgement";
import Teacher from "@/pages/Teacher";
import Homeworks from "@/components/Homeworks";
import NotFound from "@/components/NotFound";

Vue.use(VueRouter)

const routes = [
    {
        path: '/problems',
        component: Problems,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/login',
        component: Login,
    },
    {
        path: '/register',
        component: Regist,
    },
    {
        path: '/problems/:id(\\d+)',
        component: Problem,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/',
        component: HelloWorld,
    },
    {
        path: '/114514',
        component: HelloWorld2,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/user/:id(\\d+)',
        component: User,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/judgement/:id(\\d+)',
        component: Judgement,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/homeworks',
        component: Homeworks,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/teacher',
        component: Teacher,
        meta: {
            isAuth: true
        }
    },
    {
        path: '/*',
        component: NotFound,

    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    // to要跳转到的路径
    // from从哪个路径来
    // next往下执行的回调
    // 在localStorage中获取token
    let token=localStorage.getItem('user')
    // 判断该页面是否需要登录
    if(to.meta.isAuth){
        // 如果token存在直接跳转
        if(token){
            next()
        }else{
            // 否则跳转到login登录页面
            next({
                path:'/login',
                // 跳转时传递参数到登录页面，以便登录后可以跳转到对应页面
                query:{
                    redirect:'/'
                }
            })
        }
    }else{
        // 如果不需要登录，则直接跳转到对应页面
        next()
    }
})

export default router
