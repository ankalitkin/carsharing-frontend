import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import {i18n} from './i18n';
import * as toastr from "toastr";
import FlagIcon from 'vue-flag-icon';

toastr.options.positionClass = "toast-with-offset"
Vue.use(FlagIcon);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    vuetify,
    i18n,
    render: h => h(App)
}).$mount('#app');
