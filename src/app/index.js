import './style.styl';
import './components';
import './pages/bootstrap.styl';
import './pages/components.styl';

window.app = {};

import Vue from 'vue';
import router from './router';
import store from './store';

import BootstrapVue from 'bootstrap-vue'
Vue.use(BootstrapVue);

import Notifications from 'vue-notification'
Vue.use(Notifications);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

var app = new Vue({
    el: '#app',
    store,
    router,
    data: {

    },
    methods: {

    },
    created() {
        this.$store.dispatch('updateUser');
    }
});
window.app = app;
