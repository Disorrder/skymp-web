import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            userData: {
                username: '',
                password: '',
            },
            valid: {},
            status: null, // one of null, pending, error, invalidToken
            messages: [],
            formDisabled: false,
        }
    },
    methods: {
        reset(e) {
            e.preventDefault();
            this.validate();

            this.formDisabled = true;
            let token = this.$route.query.token;
            this.userData.token = token;
            $.post(config.api+'/auth/reset/'+token, this.userData)
                .then((user) => {
                    this.$root.saveCurrentUser(user);
                    localStorage.lastLogin = user.username;

                    this.$notify({type: 'success', title: 'Пароль успешно изменён'});
                    this.$router.push({name: 'profile'});
                    this.$notify({type: 'success', title: 'Добро пожаловать!'});
                })
                .catch((e) => {
                    console.log('Reset failed', e);
                    this.formDisabled = false;
                })
            ;
        },

        validate() {

        },

        flushError() {
            this.status = null;
            this.messages = [];
        },
    },
    created() {
        this.status = null; // 'pending'
        var token = this.$route.query.token;
        $.get(config.api+'/auth/reset/'+token)
            .then(() => {
                console.log('Token is correct.');
                this.status = null;
            })
            .catch((e) => {
                console.log('Invalid token', e);
                this.status = 'invalidToken';
            })
        ;
    }
};
