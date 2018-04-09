import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

var router = new VueRouter({
    mode: 'history',
    routes: [
        {name: 'main', path: '/', component: require('app/pages/main').default},
        {name: 'about', path: '/about', component: require('app/pages/about').default},
    ]
});

export default router;

router.beforeEach((to, from, next) => {
    next();
    $(window).trigger('resize');
});
