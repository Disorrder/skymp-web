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
            invalidToken: null,
        }
    },
    computed: {

    },
    methods: {
        reset(e) {
            e.preventDefault();
            this.validate();

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
        console.log('qwe', this);
        var token = this.$route.query.token;
        $.get(config.api+'/auth/reset/'+token)
            .then(() => {
                console.log('Token is correct.');
                this.invalidToken = false;
            })
            .catch((e) => {
                console.log('Invalid token', e);
                this.invalidToken = true;
            })
        ;
    },
    mounted() {

    }
};
