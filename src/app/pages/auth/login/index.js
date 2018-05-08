import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            userData: {
                username: '',
                password: '',
            },
            formDisabled: false,
        }
    },
    methods: {
        login(e) {
            if (this.formDisabled) return;
            this.formDisabled = true;
            this.flushErrors();

            this.$validator.validateAll()
                .then((res) => {
                    if (!res) throw res;
                    return this.$store.dispatch('login', this.userData);
                })
                .then((user) => {
                    if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                    } else {
                        this.$router.push({name: 'profile'});
                    }
                    this.$notify({type: 'success', title: 'Добро пожаловать!'});
                })
                .catch((res) => {
                    if (!res) return;

                    switch (res.responseText) {
                        case 'ERR_INCORRECT_USERNAME': return this.errors.add({field: 'username', rule: 'incorrect', msg: true});
                        case 'ERR_INCORRECT_PASSWORD': return this.errors.add({field: 'password', rule: 'incorrect', msg: true});
                        case 'ERR_AUTH_DECLINED': return this.errors.add({field: 'password', rule: 'declined', msg: true});
                        default: this.$notify({type: 'error', title: 'ERROR', text: 'Unknown error occurred 0_0'});
                    }
                })
                .finally((res) => {
                    this.formDisabled = false;
                })
            ;
        },

        forgotPassword() {
            this.flushErrors();

            this.$validator.validate('username')
                .then((res) => {
                    if (!res) throw res;
                    return $.post(config.api+'/auth/reset', this.userData)
                })
                .then(() => {
                    this.$notify({type: 'success', text: 'Письмо с инструкциями отправлено'});
                })
                .catch((res) => {
                    if (!res) return;
                    if (res.responseText === 'ERR_MAIL_ALREADY_SENT') {
                        this.$notify({type: 'error', text: 'Письмо уже было отправлено. Не забудь проверить в спаме.'});
                        return;
                    }

                    if (res.responseText === 'ERR_INCORRECT_USERNAME') {
                        this.errors.add({field: 'username', rule: 'incorrect', msg: true});
                    }

                    this.$notify({type: 'error', text: 'Что-то пошло не так'});
                })

            ;
        },

        flushErrors(selector) {
            if (!selector) return this.errors.clear();

            let [field, rule] = selector.split(':');
            this.errors.items = this.errors.items.filter((v) => {
                if (field && !rule) return !(v.field === field);
                if (!field && rule) return !(v.rule === rule);
                return !(v.field === field && v.rule === rule);
            });
        }
    },
    created() {

    },
    mounted() {
        var loginControl = $('#auth input[name="username"]');
        var passControl = $('#auth input[name="password"]');

        this.userData.username = this.$route.query.username || localStorage.lastLogin;
        if (!this.userData.username) {
            loginControl.focus();
        } else {
            passControl.focus();
        }
    }
};
