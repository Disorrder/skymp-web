import './style.styl';
import Tablist from 'app/components/tablist';

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
        $(Tablist.initialize);
    },
    destroyed() {

    }
};
