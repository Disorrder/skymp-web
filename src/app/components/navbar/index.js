import './style.styl';

import Vue from 'vue';
Vue.component('navbar', {
    template: require('./template.pug')(),
    data() {
        return {
            menu: [
                {name: 'main', title: 'Новости'},
                {name: 'forum', title: 'Форум', url: 'http://forum.skymp.ru/'},
                {name: 'about', title: 'Особенности'},
                {name: 'support', url: '#support', title: 'Поддержка', enabled: false},
                {name: 'shop', url: '#shop', title: 'Магазин', enabled: false},
                {name: 'profile', title: 'Профиль', enabled: true},
            ]
        }
    },
    mounted() {

    }
});
