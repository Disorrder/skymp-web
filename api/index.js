const buildCfg = require('../buildconfig.json');
const cfg = require('./config');
require('./utils');

var mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.connect(cfg.db);

const Koa = require('koa');
const app = new Koa();

const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');
app.use(ratelimit({
    // documentation: https://github.com/koajs/ratelimit
    // ограничение: не боллее 100 запросов в секунду от одного IP
    db: new Redis(),
    duration: 60000,
    errorMessage: '<h1>Error 429: Too many requests!</h1>',
    id: (ctx) => ctx.ip,
    headers: {
        remaining: 'Rate-Limit-Remaining',
        reset: 'Rate-Limit-Reset',
        total: 'Rate-Limit-Total'
    },
    max: 100,
    disableHeader: false,
}));

// Common headers
app.use(async (ctx, next) => {
    if (['http://localhost:8080', 'http://skymp.ru', 'http://disordered.ru'].includes(ctx.request.header.origin)) {
        ctx.set('Access-Control-Allow-Origin', ctx.request.header.origin);
    }
    ctx.set('Access-Control-Allow-Credentials', 'true');

    try {
        await next();
    } catch(e) {
        e.headers = Object.assign({}, e.headers, ctx.response.headers);
        throw e;
    }
});

const session = require('koa-session');
app.keys = [cfg.secretKey];
app.use(session({}, app));

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

const passport = require('koa-passport');
app
    .use(passport.initialize())
    .use(passport.session())
;

const router = require('./router');
app
    .use(router.routes())
    .use(router.allowedMethods())
;

app.listen(buildCfg.api.port, function () {
    const { address, port } = this.address();
    const protocol = this.addContext ? 'https' : 'http';
    console.log(`Listening on ${protocol}://${address}:${port}...`);
});

console.log('\nAPI server is running on', buildCfg.api.port, 'port.');

module.exports = app;
