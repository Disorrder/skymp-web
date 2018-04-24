import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            status: null, // one of null, pending, invalidToken
        }
    },
    methods: {
        confirm() {
            this.status = 'pending';
            let token = this.$route.query.token;
            $.get(config.api+'/auth/confirm/'+token)
                .then((user) => {
                    console.log('Confirm success', user);
                    this.$root.saveCurrentUser(user);
                    localStorage.lastLogin = user.username;

                    this.$notify({type: 'success', title: 'Почта успешно подтверждена.'});
                    this.$router.push({name: 'profile'});
                    this.$notify({type: 'success', title: 'Добро пожаловать!'});
                })
                .catch((e) => {
                    console.log('Confirm failed', e);
                    this.status = 'invalidToken';
                })
            ;
        },

    },
    created() {
        this.confirm();
    },
};
