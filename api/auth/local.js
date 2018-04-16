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

    // TODO: remove password
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
        console.log(user.resetToken.substr(0, 8), expires, new Date(expires));
        if (expires > Date.now()) return ctx.throw(400, 'ERR_MAIL_ALREADY_SENT');
    }

    let expires = Date.now() + 1000*60*60; // Expires in 1 hour
    user.resetToken = expires.toString(36) + String.randomize(8);
    await user.save();
    await sendEmail.register({to: user.email, resetToken: user.resetToken})
    ctx.body = 'Email sent.';
});

module.exports = router;
