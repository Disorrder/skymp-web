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


router.get('/logout', (ctx) => {
    var user = ctx.state.user;
    ctx.logout();
    ctx.body = user ? `Good bye, ${user.username} :c` : '???';
});

module.exports = router;
