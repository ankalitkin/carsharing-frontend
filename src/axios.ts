import axios from 'axios';
import store from './store';
import router from "@/router";
import {SecurityService} from "@/security/SecurityService";

export default () => {
    axios.interceptors.request.use(
        (config) => {
            const tokenData = store.getters.getTokenData;
            if (tokenData) {
                config.headers.Authorization = tokenData;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        },
    );

    axios.interceptors.response.use(
        (response) => response,
        (error) => {
            if (error.response.status == 401) {
                SecurityService.clearToken();
                if (router.currentRoute.meta.authorized) {
                    router.push('/login');
                }
            }
            return Promise.reject(error);
        },
    );
}
