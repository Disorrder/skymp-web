import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            userData: {
                username: '',
                email: '',
                password: '',
                password2: '',
            },
            valid: {},
            formDisabled: false,
            status: null,
            messages: [],
        }
    },
    computed: {

    },
    methods: {
        register(e) {
            e.preventDefault();
            if (this.formDisabled) return;

            this.status = null;
            this.messages = [];

            this.validate();
            if (this.status === 'error') {
                return;
            }

            this.formDisabled = true;

            $.post(config.api+'/user/add', this.userData)
                .then((user) => {
                    this.$root.saveCurrentUser(user);
                    localStorage.lastLogin = user.username;
                })
                .catch((res) => {
                    this.status = 'error';
                    this.messages.push(res.responseText);
                    if (res.responseText === 'ERR_USERNAME_BUSY') this.valid.username = false;
                    if (res.responseText === 'ERR_EMAIL_BUSY') this.valid.email = false;
                })
                .always((res) => {
                    this.formDisabled = false;
                })
            ;
        },

        validate() {
            ['username', 'email', 'password', 'password2'].forEach((v) => {
                this.valid[v] = !!this.userData[v];
            });

            if (!this.isFormValid()) {
                this.status = 'error';
                return;
            }

            if (this.userData.password.length < 6) {
                this.valid.password = false;
                this.messages.push('ERR_PASSWORD_TOO_SHORT');
            }

            if (this.userData.password !== this.userData.password2) {
                this.valid.password2 = false;
                this.messages.push('ERR_PASSWORDS_MISMATCH');
            }

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
        },

        checkUsername() {

        },
        checkEmail() {

        }
    },
    created() {

    },
    mounted() {
        var loginControl = $('#auth input[name="username"]');
        loginControl.focus();
    }
};
