function randomFloat(a, b) {
    return a + Math.random() * (b - a);
}
function randomInt(a, b) {
    return Math.floor( randomFloat(a, b+1) );
}

function clamp(val, min, max) {
    return Math.min(Math.max(min, val), max)
}


import Vue from 'vue';
Vue.component('starline', {
    template: require('./template.pug')(),
    data() {
        return {
            points: [],
        }
    },
    computed: {
        pointsLineStr() {
            return this.points.map((v) => `${v.cx},${v.cy}`).join(' ');
        }
    },
    methods: {
        genPoints() {
            this.points.length = 0;
            for (let i = 0; i < this.$el.clientWidth / 40; i++) {
                this.points.push({});
            }
        },

        randomize() {
            this.genPoints();
            var w = this.$el.clientWidth;
            var h = this.$el.clientHeight;
            var len = this.points.length;
            var subW = w / len;
            var spread = subW / 3;
            this.points.forEach((v, i) => {
                if (i === this.points.length-1) i++;
                v.cx = i*subW + randomFloat(-spread, spread);
                v.cx = clamp(v.cx, 3, w-3);
                v.cy = randomFloat(3, h-3);
                v.r  = randomFloat(2.5, 5);
                return v;
            });
        }
    },
    mounted() {
        // this.genPoints();
        this.randomize();
        $(window).on('resize', () => {
            setTimeout(this.randomize.bind(this), 100);
        });
    }
});
