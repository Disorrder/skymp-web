import './style.styl';
import './components';
import './pages/bootstrap.styl';
import './pages/components.styl';

import Vue from 'vue';
import store from './store';
import router from './router';

var app = new Vue({
    el: '#app',
    store,
    router,
    data: {

    },

});

window._app = app;
