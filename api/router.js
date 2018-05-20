var Router = require('koa-router');
var router = new Router();

{
    let route;
    route = require('./auth');
    router.use('/auth', route.routes(), route.allowedMethods());

    route = require('./user');
    router.use('/user', route.routes(), route.allowedMethods());

    route = require('./character');
    router.use('/character', route.routes(), route.allowedMethods());

    route = require('./server');
    router.use('/server', route.routes(), route.allowedMethods());

    route = require('./email');
    router.use('/email', route.routes(), route.allowedMethods());

    route = require('./invite');
    router.use('/invite', route.routes(), route.allowedMethods());

    route = require('./payment');
    router.use('/payment', route.routes(), route.allowedMethods());
}

router.get('/', (ctx, next) => {
    // ctx.router available
    ctx.body = 'Hi there! This is my API. Feel free and good luck!';
});

module.exports = router;
