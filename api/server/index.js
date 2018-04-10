// const User = require('../user/model');
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
        // throw e;
        return ctx.throw(500, e.message);
    }

    ctx.body = item;
});

router.get('/', async (ctx) => {
    // Get list
    var list = await Server.find({});
    ctx.body = list;
    // list.map((v) => {
    //
    // });
});

router.get('/:id', async (ctx) => {
    // TODO check ownerId
    var item = await Server.findById(id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    // TODO check ownerId
    var data = ctx.request.body
    var character = await Server.findById(id);
    if (!character) return ctx.throw(404);

    Object.assign(character, data);
    character.save();
    ctx.body = character;
});

module.exports = router;
