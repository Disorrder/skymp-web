const Server = require('./model');
const Router = require('koa-router');
var router = new Router();

router.post('/add', async (ctx) => {
    // Create one
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    // TODO only admin can create

    var data = ctx.request.body;
    var item = new Server(data);
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    ctx.body = item;
});

router.get('s', async (ctx) => {
    // Get list
    var list = await Server.find({});
    ctx.body = list;
});

router.get('/:id', async (ctx) => {
    var item = await Server.findById(id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    if (!ctx.state.user.access.isAdmin) return ctx.throw(403);

    var data = ctx.request.body;
    try {
        var item = await Server.findByIdAndUpdate({_id: ctx.params.id}, data, {new: true});
    } catch(e) {
        console.log(e, e.message);
        ctx.throw(500, e.message);
    }
    if (!item) return ctx.throw(404);

    ctx.body = item;
});

module.exports = router;
