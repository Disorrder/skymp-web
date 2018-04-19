const User = require('./model');
const Router = require('koa-router');
const email = require('../email/send');
var router = new Router();

// Registration
router.post('/add', async (ctx) => {
    var data = ctx.request.body;

    if (data.password !== data.password2) {
        return ctx.throw(400, 'ERR_PASSWORDS_MISMATCH');
    }

    var user = new User(data);
    try {
        await user.save();
        await email.sendConfirmToken({to: user.email, confirmToken: user.confirmToken, origin: ctx.get('origin')});
        await ctx.login(user);
    } catch(e) {
        if (e.code === 11000) {
            // TODO: recognize from text
            user = await User.findOne({username: data.username});
            if (user) return ctx.throw(400, 'ERR_USERNAME_BUSY');
            return ctx.throw(400, 'ERR_EMAIL_BUSY');
        } else {
            console.log('500', '/user/add', e);
            return ctx.throw(500, e.message);
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
    if (!ctx.isAuthenticated()) return ctx.throw(401);

    var item = await User.findById(ctx.params.id);
    if (!item) ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    if (!ctx.state.user.access.isAdmin) return ctx.throw(403);

    var data = ctx.request.body;
    try {
        var item = await User.findByIdAndUpdate(ctx.params.id, data, {new: true});
    } catch(e) {
        console.log(e, e.message);
        ctx.throw(500, e.message);
    }
    if (!item) return ctx.throw(404);

    ctx.body = item;
});


module.exports = router;
