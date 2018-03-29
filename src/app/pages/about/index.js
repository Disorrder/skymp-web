import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {

        }
    },
    created() {
        if (!localStorage.about_seen) {
            localStorage.about_seen = true;
        }
    },
    mounted() {

    },
    destroyed() {
        
    }
};
