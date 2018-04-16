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
            formDisabled: false,
            status: null, // one of null, ok, error
            messages: [],
        }
    },
    computed: {

    },
    methods: {
        login(e) {
            e.preventDefault();
            if (this.formDisabled) return;

            this.status = null;
            this.messages = [];

            this.validate();
            if (this.status === 'error') return;

            this.formDisabled = true;

            $.post(config.api+'/auth/login', this.userData)
                .then((user) => {
                    this.$root.saveCurrentUser(user);
                    if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                    }
                    localStorage.lastLogin = user.username;
                    this.$notify({type: 'success', title: 'Добро пожаловать!'});
                })
                .catch((res) => {
                    this.status = 'error';
                    this.messages.push(res.responseText);
                    if (res.responseText === 'ERR_INCORRECT_USERNAME') this.valid.username = false;
                    if (res.responseText === 'ERR_INCORRECT_PASSWORD') this.valid.password = false;
                })
                .always((res) => {
                    this.formDisabled = false;
                })
            ;
        },

        forgotPassword() {
            this.flushError();
            if (!this.userData.username) {
                this.status = 'error';
                this.valid.username = false;
                this.messages.push('ERR_INCORRECT_USERNAME');
                return;
            }

            $.post(config.api+'/auth/reset', this.userData)
                .then(() => {
                    this.$notify({type: 'success', text: 'Письмо с инструкциями отправлено'});
                })
                .catch((res) => {
                    if (res.responseText === 'ERR_MAIL_ALREADY_SENT') {
                        this.$notify({type: 'error', text: 'Письмо уже было отправлено. Не забудь проверить в спаме.'});
                        return;
                    }

                    if (res.responseText === 'ERR_INCORRECT_USERNAME') {
                        console.log(this.valid);
                        this.valid.username = false;
                        this.messages.push(res.responseText);
                    }
                    if (!this.isFormValid()) {
                        this.status = 'error';
                        return;
                    }

                    this.$notify({type: 'error', text: 'Что-то пошло не так'});
                })

            ;
        },

        validate() {
            ['username', 'password'].forEach((v) => {
                this.valid[v] = !!this.userData[v];
            });

            if (!this.isFormValid()) {
                this.status = 'error';
                return;
            }
        },

        isFormValid() {
            return Object.values(this.valid).every((v) => v === true);
        },

        flushError() {
            this.status = null;
            this.messages = [];
            for (let k in this.valid) this.valid[k] = true;
        },
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
