import Vue from 'vue'
import VueRouter, {RouteConfig} from 'vue-router'
import {SecurityService} from "@/security/SecurityService";

const LoginView = () => import( "@/views/LoginView/LoginView.vue");
const PageNotFoundView = () => import( "@/views/PageNotFoundView/PageNotFoundView.vue");
const EditView = () => import("@/views/EditView/EditView.vue")
const Home = () => import( "@/components/Home.vue");
const CarMap = () => import( "@/components/CarMap.vue");
const CustomerCarMap = () => import( "@/components/CustomerCarMap.vue");

Vue.use(VueRouter);

const routes: RouteConfig[] = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        meta: {
            employee: true
        }
    },
    {
        path: '/cars',
        name: 'CarMap',
        component: CarMap,
        meta: {
            employee: true
        }
    },    {
        path: '/map',
        name: 'CustomerCarMap',
        component: CustomerCarMap,
    },
    {
        path: '/editProfile',
        name: 'EditView',
        component: EditView,
        meta: {
            employee: true
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
    if (to.meta.employee && !SecurityService.isEmployee()
        || to.meta.admin && !SecurityService.isAdmin()) {
        if (!SecurityService.isAuthorized() || SecurityService.isEmployee()) {
            next('/login');
        } else {
            next('/map');
        }
    } else next()
});

export default router
