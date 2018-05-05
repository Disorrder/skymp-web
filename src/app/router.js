import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    routes: [
        {name: 'main', path: '/', component: require('app/pages/main').default},
        {name: 'about', path: '/about', component: require('app/pages/about').default},

        {name: 'auth', path: '', component: require('app/pages/auth').default, children: [
            {name: 'login', path: '/login', component: require('app/pages/auth/login').default},
            {name: 'register', path: '/register', component: require('app/pages/auth/register').default},
        ]},
        {name: 'reset', path: '/reset', component: require('app/pages/auth/reset').default},
        {name: 'confirm', path: '/auth/confirm', component: require('app/pages/auth/confirm').default},

        {name: 'profile', path: '/profile', meta: {needAuth: true}, component: require('app/pages/profile').default},
    ]
});

export default router;

import store from './store';

router.beforeEach((to, from, next) => {
    // TODO: get app, auth to vuex
    console.log(to, to.matched, to.meta);

    if (to.meta.needAuth && !store.isAuthenticated) {
        store.dispatch('updateUser')
            .then((res) => {
                next();
            })
            .catch(() => {
                next({path: '/login', query: { redirect: to.fullPath }});
            })
        ;
        return;
    }

    next();
    $(window).trigger('resize');
});
