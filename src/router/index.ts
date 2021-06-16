import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {SecurityService} from "@/security/SecurityService";

const LoginView = () => import( "@/views/LoginView/LoginView.vue");
const PageNotFoundView = () => import( "@/views/PageNotFoundView/PageNotFoundView.vue");
const EditView = () => import("@/views/EditView/EditView.vue")
const Home = () => import( "@/components/Home.vue");
const CarMap = () => import( "@/components/CarMap.vue");

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            authorized: true
        }
    },
    {
        path: '/cars',
        name: 'CarMap',
        component: CarMap,
        meta: {
            authorized: true
        }
    },
    {
        path: '/editProfile',
        name: 'EditView',
        component: EditView,
        meta: {
            authorized: true
        }
    }, {
        path: '/login',
        name: 'LoginView',
        component: LoginView
    },
    {
        path: '/logout',
        beforeEnter: (to, from, next) => {
            SecurityService.clearToken();
            next('/login');
        }
    },
    {
        path: '/*',
        name: 'PageNotFoundView',
        component: PageNotFoundView
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

router.beforeEach((to, from, next) => {
    if (to.meta.authorized && !SecurityService.isAuthorized()
        || to.meta.admin && !SecurityService.isAdmin()) {
        next('/login');
    } else next()
});

export default router
