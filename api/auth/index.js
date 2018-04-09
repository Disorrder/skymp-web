const User = require('../user/model');
var Router = require('koa-router');
var router = new Router();

const passport = require('koa-passport');

passport.serializeUser(function(user, done) {
    done(null, user._id);
});

passport.deserializeUser(async function(id, done) {
    try {
        var user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});


{
    let route;
    route = require('./local');
    router.use('', route.routes(), route.allowedMethods());
}

router.post('/register', async (ctx) => {
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
            console.log('500', '/auth/register', e);
            ctx.throw(500, e.message);
        }
        return;
    }
    ctx.body = user;
});

module.exports = router;
