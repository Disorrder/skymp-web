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
                .done((res) => {
                    console.log('done', res.data, this, this.$root);
                    this.$root.saveCurrentUser(res);
                    if (this.$route.query.redirect) {
                        this.$router.push(this.$route.query.redirect);
                    }
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
        $('#auth [name="login"]').focus();
        if (this.$route.query.login) {
            $('#auth [name="login"]').val(this.$route.query.login);
            $('#auth [name="password"]').focus();
        }
    }
};
