// const User = require('../user/model');
const Character = require('./model');
const Router = require('koa-router');
var router = new Router();

router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    next();
});

router.post('/add', async (ctx) => {
    // Create one
    if (ctx.state.user.characters.length >= ctx.state.user.charactersMax) ctx.throw(403);

    var data = ctx.request.body;
    data.owner = ctx.state.user._id
    var item = new Character(data);
    console.log(item);
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
    console.log(list, ctx.state.user.characters);
    ctx.body = 'q';
    console.log(ctx);
});

router.get('/:id', async (ctx) => {
    // TODO check ownerId
    var item = await Character.findById(ctx.params.id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    // TODO check ownerId
    var data = ctx.request.body
    var character = await Character.findById(id);
    if (!character) return ctx.throw(404);

    Object.assign(character, data);
    character.save();
    ctx.body = character;
});

module.exports = router;
