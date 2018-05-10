const Model = require('./model');
const Router = require('koa-router');
var router = new Router();

router.post('/add', async (ctx) => {
    // Create one
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    if (!ctx.state.user.access.isAdmin) return ctx.throw(403);

    var data = ctx.request.body;
    var item = new Model(data);
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    ctx.body = item;
});

router.get('s', async (ctx) => {
    // Get list
    var access = ctx.isAuthenticated() ? ctx.state.user.access : {};
    var list = await Model.find({});
    list = list.filter((v) => {
        if (v.type === 'alpha' && !access.isDeveloper) return false;
        if (v.type === 'beta' && !access.isTester) return false;
        return true;
    });
    ctx.body = list;
});

router.get('/:id', async (ctx) => {
    var item = await Model.findById(id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    if (!ctx.state.user.access.isAdmin) return ctx.throw(403);

    var data = ctx.request.body;
    try {
        var item = await Model.findByIdAndUpdate({_id: ctx.params.id}, data, {new: true});
    } catch(e) {
        console.log(e, e.message);
        ctx.throw(500, e.message);
    }
    if (!item) return ctx.throw(404);

    ctx.body = item;
});

module.exports = router;
