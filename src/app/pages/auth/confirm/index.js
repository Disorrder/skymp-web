export default {
    template: require('./template.pug')(),

    created() {
        const token = this.$route.query.token;
        $.get(config.api + '/auth/confirm/' + token)
            .then(() => this.invalidToken = false)
            .catch(() => this.invalidToken = true)
        ;
    }
};
