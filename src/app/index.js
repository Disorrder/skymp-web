import './style.styl';
import './components';
import './pages/bootstrap.styl';
import './pages/components.styl';

window._app = {};

import Vue from 'vue';
import router from './router';
// import store from './store';

$.ajaxSetup({
    crossDomain: true,
    xhrFields: {
        withCredentials: true
    }
});

var app = new Vue({
    el: '#app',
    // store,
    router,
    data: {
        user: null,
    },
    methods: {
        getCurrentUser() {
            if (this.__getCurrentUser) return this.__getCurrentUser;
            return this.__getCurrentUser = $.get(config.api+'/user')
                .then((res) => {
                    return this.saveCurrentUser(res);
                })
                .catch(() => {
                    this.user = null;
                })
            ;
        },
        saveCurrentUser(data) {
            if (typeof data !== 'object') return;
            delete data.password; // TODO: rem
            delete data.createdAt;
            delete data.updatedAt;
            delete data.__v;
            localStorage.currentUser = JSON.stringify(data);
            return this.user = data;
        }
    },
    created() {
        if (localStorage.currentUser) this.user = JSON.parse(localStorage.currentUser);
        this.getCurrentUser();
    }
});
window._app = app;
