import './style.styl';

export default {
    template: require('./template.pug')(),
    data() {
        return {
            chargeAmount: 150
        }
    },
    computed: {

    },
    filters: {
        apiUrl(v) { return config.api + v; },
    },
    methods: {
        __charge(amount) { // del??
            if (!amount) return;
            return $.post(config.api+'/payment/add', {amount})
                .then((res) => {
                    console.log(res);
                    var query = {
                        account: res._id,
                        sum: amount,
                        // desc: `Пополнение счёта на ${amount} SkyPoints.`,
                    };
                    var qs = Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');
                    // window.location = `https://unitpay.ru/pay/123461-70911?${qs}`;
                    // window.open(`, "SkyMP charge")
                })
            ;
        },

        onSubmit() {
            $('#charge-amount-link')[0].click();
        }
    },
    created() {

    }
};
