import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {

        }
    },
    created() {
        if (true || !localStorage.about_seen) {
            location.href = '/about';
        }
    }
};
