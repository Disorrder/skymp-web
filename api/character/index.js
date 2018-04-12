var mongoose = require('mongoose');
const Character = require('./model');
const Router = require('koa-router');
var router = new Router();

router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    return next();
});

router.post('/add', async (ctx) => {
    // Create one
    if (ctx.state.user.characters.length >= ctx.state.user.charactersMax) ctx.throw(403);

    var data = ctx.request.body;
    data.owner = ctx.state.user._id
    var item = new Character(data);
    try {
        await item.save();
        ctx.state.user.characters.push(item._id);
        ctx.state.user.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    ctx.body = item;
});

router.get('/', async (ctx) => {
    // get array of users's characters
    var list = ctx.state.user.characters.map(async (id) => {
        return await Character.findById(id);
    });
    list = await Promise.all(list);
    ctx.body = list;
});

router.get('/:id', async (ctx, next) => {
    var isOwner = ctx.state.user.characters.some((id) => {
        return id.equals(ctx.params.id);
    });
    if (!isOwner) return ctx.throw(403);

    var item = await Character.findById(ctx.params.id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    var isOwner = ctx.state.user.characters.some((id) => {
        return id.equals(ctx.params.id);
    });
    if (!isOwner) return ctx.throw(403);

    var data = ctx.request.body;
    try {
        var item = await Character.findByIdAndUpdate({_id: ctx.params.id}, data, {new: true});
    } catch(e) {
        console.log(e, e.message);
        ctx.throw(500, e.message);
    }
    if (!item) return ctx.throw(404);

    ctx.body = item;
});

module.exports = router;
