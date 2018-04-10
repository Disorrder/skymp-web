const User = require('./model');
const Router = require('koa-router');
var router = new Router();

// Registration
router.post('/add', async (ctx) => {
    var data = ctx.request.body;

    if (data.password !== data.password_repeat) {
        ctx.throw(400, 'ERR_PASSWORDS_MISMATCH');
    }

    var user = new User(data);
    try {
        await user.save();
        await ctx.login(user);
    } catch(e) {
        if (e.code === 11000) {
            ctx.throw(400, 'ERR_USER_IS_ALREADY_EXISTS');
        } else {
            console.log('500', '/user/add', e);
            ctx.throw(500, e.message);
        }
        return;
    }
    ctx.body = user;
});

router.get('/', async (ctx) => {
    // Get current user. May be rename route to /me?
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    ctx.body = ctx.state.user;
});

router.get('/:id', async (ctx) => {
    var user = await User.findById(ctx.params.id);
    if (!user) ctx.throw(404);
    ctx.body = user;
});

router.put('/:id', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    // TODO: check role

    var data = ctx.request.body
    var user = await User.findById(ctx.params.id);
    if (!user) return ctx.throw(404);

    if (data.access_token) user.access_token = data.access_token;
    if (data.message_token) user.message_token = data.message_token;

    user.save();
    ctx.body = user;
});

module.exports = router;
