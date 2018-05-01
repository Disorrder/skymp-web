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

    },
    created() {

    },
    mounted() {

    }
};
