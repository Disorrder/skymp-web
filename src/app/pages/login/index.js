import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            authData: {
                username: '',
                password: ''
            },
            formDisabled: false,
            status: null,
            statusText: '',
        }
    },
    computed: {

    },
    methods: {
        login(e) {
            e.preventDefault();
            if (this.formDisabled) return;

            this.formDisabled = true;
            this.statusText = '';
            $.post(config.api+'/auth/login', this.authData)
                .done((user) => {
                    this.$root.saveCurrentUser(user);
                    if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                    }
                    localStorage.lastLogin = user.username;
                })
                .fail((res) => {
                    this.statusText = res.responseText;
                })
                .always((res) => {
                    this.formDisabled = false;
                })
            ;
        }
    },
    created() {

    },
    mounted() {
        var loginControl = $('#auth input[name="username"]');
        var passControl = $('#auth input[name="password"]');
        
        this.authData.username = this.$route.query.username || localStorage.lastLogin;
        if (!this.authData.username) {
            loginControl.focus();
        } else {
            passControl.focus();
        }
    }
};
