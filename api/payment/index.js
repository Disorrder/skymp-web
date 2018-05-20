const cfg = require('../config');
const Model = require('./model');
const Router = require('koa-router');
var router = new Router();

router.get('/create/:amount', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var data = {
        status: 'created',
        amount: ctx.params.amount,
        user: ctx.state.user._id
    };
    var item = new Model(data);
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    var query = {
        account: item._id,
        sum: item.amount,
        // desc: `Пополнение счёта на ${item.amount} SkyPoints.`,
    };
    var qs = Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');
    var url = `https://unitpay.ru/pay/${cfg.unitpay.public}?${qs}`;
    ctx.redirect(url);
});

router.post('/add', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var data = ctx.request.body;
    data.user = ctx.state.user._id;
    data.status = 'created';
    var item = new Model(data);
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    ctx.body = item;
});

router.get('s/my', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var user = ctx.state.user._id;
    var list = await Model.find({user});
    ctx.body = list;
});

router.put('/:id', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var item = await Model.findById(ctx.params.id);
    if (!item) return ctx.throw(404);
    if (item.user !== ctx.state.user._id) return ctx.throw(403);

    // пока не знаю что тут можно изменять вручную
    return ctx.throw(501);
});

router.get('/notify', async (ctx) => {
    console.log('payment notify', ctx.query);

    ctx.body = ctx.query;
});

module.exports = router;
