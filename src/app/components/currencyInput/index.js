import Vue from 'vue';
Vue.component('currency-input', {
    template: require('./template.pug')(),
    props: {
        value: {
            type: Number,
            default: 0
        },
    },
    methods: {
        onInput(e) {
            var newVal = this.formatValue(this.$el.value);
            this.$emit('input', newVal);
        },
        formatValue(v = 0) {
            v = parseFloat(v);
            if (!v || v < 0) return 0;
            if (v > 1e6) return 1e6;
            return Math.round(v*100) / 100;
        }
    }
});
