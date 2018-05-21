const cfg = require('../config');
const User = require('../user/model');
const Model = require('./model');
const Router = require('koa-router');
var router = new Router();

router.get('/create/:amount', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var data = {
        status: 'created',
        amount: ctx.params.amount,
        sum: ctx.params.amount,
        user: ctx.state.user._id
    };
    if (ctx.state.user.access.isAdmin === 'disorder') data.sum = 0.01; // debug
    var item = new Model(data);
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    var query = {
        account: item._id,
        sum: item.sum,
        // desc: `Пополнение счёта на ${item.amount} SkyPoints.`,
    };
    var qs = Object.keys(query).map((k) => `${k}=${query[k]}`).join('&');
    var url = `https://unitpay.ru/pay/${cfg.unitpay.public}?${qs}`;
    ctx.redirect(url);
});

router.post('/add', async (ctx) => { //? mb del?
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

router.put('/:id', async (ctx) => { //?
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var item = await Model.findById(ctx.params.id);
    if (!item) return ctx.throw(404);
    if (item.user !== ctx.state.user._id) return ctx.throw(403);

    // пока не знаю что тут можно изменять вручную
    return ctx.throw(501);
});

router.get('/notify', async (ctx) => {
    console.log('payment notify', ctx.query);
    var query = remapPhpQuery(ctx.query);

    if (!query.params || !query.params.account) {
        ctx.body = {error: {message: "Некорректный запрос"}};
        return;
    }

    var item = await Model.findById(query.params.account);
    if (!item) {
        ctx.body = {error: {message: "Платёж не найден"}};
        return;
    }

    if (item.status === 'success') {
        ctx.body = {error: {message: "Платёж уже проведён"}};
        return;
    }

    if (+query.params.orderSum !== item.sum) {
        ctx.body = {error: {message: "Сумма не соответствует"}};
        return;
    }
    if (query.params.orderCurrency !== item.currency) {
        ctx.body = {error: {message: "Валюта не соответствует"}};
        return;
    }

    if (query.method === 'check') {
        item.data = query.params;
        item.save();
        ctx.body = {result: {message: "Запрос успешно обработан"}, query, item};
        return;
    }

    if (query.method === 'pay') {
        // let user = await User.findByIdAndUpdate(item.user, )
        let user = await User.findById(item.user);
        user.skyPoints += item.amount;
        user.save();

        item.status = "success";
        item.data = query.params;
        item.save();
        ctx.body = {result: {message: "Запрос успешно обработан"}, query, item, user};
        return;
    }

    if (query.method === 'error') {
        console.log('Charge error', query, item);
        item.status = "error";
        item.data = query.params;
        item.save();
        ctx.body = {result: {message: "Запрос успешно обработан"}, query, item};
        return;
    }

    ctx.body = [query, item];
});

module.exports = router;
