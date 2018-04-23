import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            character: {
                photo: '',
                money: 0,
                reputation: 0
            }
        }
    },
    computed: {

    },
    methods: {

    },
    created() {
        var user = this.$root.user;
        if (user.characters.length) {
            this.character = user.characters[0];
        }

    },
    mounted() {

    }
};
