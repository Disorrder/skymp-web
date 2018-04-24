const User = require('../user/model');
var Router = require('koa-router');
var router = new Router();

const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const sendEmail = require('../email/send');

passport.use(new LocalStrategy(function(username, password, done) {
    var field = ~username.indexOf('@') ? 'email' : 'username';
    User.findOne({[field]: username}).select('+password')
    .then((user) => {
        if (!user) return done(null, false, 'ERR_INCORRECT_USERNAME');
        if (!user.verifyPassword(password)) return done(null, false, 'ERR_INCORRECT_PASSWORD');
        return done(null, user);
    })
    .catch((e) => done(e));
}));

router.post('/login', async (ctx) => {
    var data = ctx.request.body;
    var field = ~data.username.indexOf('@') ? 'email' : 'username';

    var user = await User.findOne({[field]: data.username}).select('+password');
    if (!user) return ctx.throw(403, 'ERR_INCORRECT_USERNAME');
    if (!user.verifyPassword(data.password)) return ctx.throw(401, 'ERR_INCORRECT_PASSWORD');

    // TODO: remove hash
    ctx.login(user);
    ctx.body = user;
});

router.post('/reset', async (ctx) => {
    var data = ctx.request.body;
    var field = ~data.username.indexOf('@') ? 'email' : 'username';

    var user = await User.findOne({[field]: data.username}).select('+resetToken');
    if (!user) return ctx.throw(403, 'ERR_INCORRECT_USERNAME');

    if (user.resetToken) {
        let expires = parseInt(user.resetToken.substr(0, 8), 36);
        if (expires > Date.now()) return ctx.throw(400, 'ERR_MAIL_ALREADY_SENT');
    }

    let expires = Date.now() + 1000*60*60; // Expires in 1 hour
    user.resetToken = expires.toString(36) + String.randomize(8);
    await user.save();
    await sendEmail.resetPassword({to: user.email, resetToken: user.resetToken, origin: ctx.get('origin')})
    ctx.body = 'Email has been sent.';
});

router.get('/reset/:token', async (ctx) => {
    var token = ctx.params.token;
    var user = await User.findOne({resetToken: token});
    if (!user) return ctx.throw(400, 'ERR_INVALID_TOKEN');
    ctx.body = 'Yes, you just requested to change password.';
});

router.post('/reset/:token', async (ctx) => {
    var token = ctx.params.token;
    var data = ctx.request.body;

    // if (!data.password) return ctx.throw(400, 'ERR_INCORRECT_PASSWORD');
    // if (data.password !== data.password2) {
    //     return ctx.throw(400, 'ERR_PASSWORDS_MISMATCH');
    // }

    // password changes requires two Queries because of 'pre save'
    var user = await User.findOne({resetToken: token});
    if (!user) return ctx.throw(400, 'ERR_INVALID_TOKEN');
    user.resetToken = null;
    user.password = data.password;
    user.save();
    ctx.login(user);

    ctx.body = user;
});

router.get('/confirm/:token', async (ctx) => {
    const token = ctx.params.token;
    try {
        var user = await User.findOneAndUpdate({confirmToken: token}, {
            confirmToken: null,
            "access.isConfirmed": true
        }, {new: true}).select('+confirmToken');
        if (!user) return ctx.throw(400, 'ERR_INVALID_TOKEN');
    } catch(e) {
        console.log('Confirm error', e, user);
        return ctx.throw(500, e.message);
    }
    ctx.body = user;
});

module.exports = router;
