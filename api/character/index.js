// const User = require('../user/model');
const Character = require('./model');
const Router = require('koa-router');
var router = new Router();

router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    next();
});

router.post('/', async (ctx) => {
    // Create
    ctx.throw(403);
});

router.get('/', (ctx) => {
    ctx.body = ctx.state.user.characters.map(async (id) => {
        return await Character.findById(id);
    });
});

router.get('/:id', async (ctx) => {
    // TODO check ownerId
    var character = await Character.findById(id);
    if (!character) return ctx.throw(404);
    ctx.body = character;
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
