const User = require('./model');
const Router = require('koa-router');
const sendEmail = require('../email/send');
var router = new Router();

// Registration
router.post('/add', async (ctx) => {
    var data = ctx.request.body;

    if (data.password !== data.password2) {
        return ctx.throw(400, 'ERR_PASSWORDS_MISMATCH');
    }

    var user = new User(data);
    user.confirmToken = String.randomize(16);

    if (await User.findOne({username: data.username}))
        return ctx.throw(400, 'ERR_USERNAME_BUSY');
    if (await User.findOne({email: data.email}))
        return ctx.throw(400, 'ERR_EMAIL_BUSY');

    try {
        await sendEmail.confirmEmail({to: user.email, confirmToken: user.confirmToken, origin: ctx.get('origin')});
    } catch (e) {
        // данная ошибка может возникнуть если, например, email имеет вид test@testdevfortest.nonexistcertainly
        console.log('EMAIL ERROR: ' + e);
        return ctx.throw(400, 'ERR_EMAIL_INCORRECT');
    }

    try {
        await user.save();
        await ctx.login(user);
    } catch(e) {
        console.log('ERROR message: ' + e.message);
        console.log('500', '/user/add', e);
        return ctx.throw(500);
    }
    ctx.body = user;
});

router.get('/', async (ctx) => {
    // Get current user. May be rename route to /me?
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    let user = await User.findById(ctx.state.user._id).populate('characters');
    ctx.body = user;
});

router.get('/check', async (ctx) => {
    var query;
    if (ctx.query.username) query = {username: ctx.query.username};
    if (ctx.query.email) query = {email: ctx.query.email};
    var user = await User.findOne(query);
    ctx.body = !!user;
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
