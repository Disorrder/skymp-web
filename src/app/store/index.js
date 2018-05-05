import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

var store = new Vuex.Store({
    modules: {
        // user,
    },

    state: {
        isAuthenticated: false,
        user: {},
        characters: [],
        servers: [],
    },

    mutations: {
        login(state, data) {
            state.isAuthenticated = true;
            state.user = data;
            localStorage.lastLogin = data.username;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.user = {};
            state.characters = [];
        },

        setCharacters(state, data) {
            state.characters = data;
        },

        setServers(state, data) {
            state.servers = data;
        },
    },

    actions: {
        login({commit}, creds) {
            return $.post(config.api+'/auth/login', creds).then((res) => {
                commit('login', res);
                return res;
            });
        },
        logout() {
            return $.get(config.api+'/auth/logout').then((res) => {
                commit('logout');
                return res;
            });
        },

        updateUser({commit}) {
            return $.get(config.api+'/user').then((res) => {
                commit('login', res);
                return res;
            });
        },

        updateCharacters({commit}) {
            return $.get(config.api+'/characters').then((res) => {
                commit('setCharacters', res);
                return res;
            });
        },

        updateServers({commit}) {
            return $.get(config.api+'/servers').then((res) => {
                console.log('updateServers', res);
                commit('setServers', res);
                return res;
            });
        },
    }


});

export default store;
