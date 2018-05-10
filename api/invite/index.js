const Model = require('./model');
const Router = require('koa-router');
var router = new Router();

router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    return next();
});

router.get('/generate', async (ctx) => {
    // Create one
    if (!ctx.state.user.access.isAdmin) return ctx.throw(403);

    var code = String.randomize(8) + '-' + String.randomize(8);
    var item = new Model({code});
    try {
        await item.save();
    } catch(e) {
        return ctx.throw(500, e.message);
    }

    ctx.body = code;
});

router.get('/activate/:code', async (ctx) => {
    // Create one
    var code = ctx.params.code;
    var item = await Model.findOne({code});
    console.log(item);

    if (!item) return ctx.throw(404);
    if (item.activatedBy) return ctx.throw(403, 'ERR_CODE_ACTIVATED');

    let user = ctx.state.user;
    if (user.access.isTester) return ctx.throw(400, 'ERR_ALREADY_TESTER');

    user.access.isTester = true;
    // user.achievements.push({id: 'CBT Tester', complete: Date.now()});
    user.save();

    item.activatedBy = user._id;
    item.save();

    ctx.body = 'Succeed';
});

router.get('/user/:username', async (ctx) => {
    var username = ctx.params.username;
    var field = ~username.indexOf('@') ? 'email' : 'username';

    ctx.body = 'Not implemented';
});

module.exports = router;
