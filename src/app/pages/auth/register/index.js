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
            formDisabled: false,
        }
    },
    methods: {
        register(e) {
            if (this.formDisabled) return;
            this.formDisabled = true;
            this.flushErrors();

            this.$validator.validateAll()
                .then((res) => {
                    if (!res) throw res;
                    return $.post(config.api+'/user/add', this.userData)
                })
                .then((user) => {
                    this.$root.saveCurrentUser(user);
                    localStorage.lastLogin = user.username;
                    this.$router.push({name: 'profile'});
                    this.$notify({type: 'success', title: 'Добро пожаловать!', text: 'Не забудь подтвердить почту ;)'});
                })
                .catch((res) => {
                    if (!res) return;
                    if (res.responseText === 'ERR_USERNAME_BUSY') return this.errors.add({field: 'username', rule: 'busy', msg: true});
                    if (res.responseText === 'ERR_EMAIL_BUSY') return this.errors.add({field: 'email', rule: 'busy', msg: true});
                })
                .always((res) => {
                    this.formDisabled = false;
                })
            ;
        },

        checkExists(field) {
            return this.$validator.validate(field)
                .then((res) => {
                    if (!res) throw res;
                    return $.get(config.api+'/user/check', {[field]: this.userData[field]});
                })
                .then((res) => {
                    if (res) return this.errors.add({field, rule: 'busy', msg: true});
                })
                .catch((res) => {
                    if (!res) return;
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
        loginControl.focus();
    }
};
