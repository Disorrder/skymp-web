import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            carousel: {
                current: 0,
            },
        }
    },
    created() {
        if (!localStorage.about_seen) {
            location.href = '/about';
        }
    }
};
