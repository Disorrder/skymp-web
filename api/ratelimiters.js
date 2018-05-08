const cfg = require('./config');

if (cfg.ratelimitEnabled) {
    // documentation: https://github.com/koajs/ratelimit
    let ratelimit = require('koa-ratelimit');
    let Redis = require('ioredis');

    module.exports.global = ratelimit({
        db: new Redis(cfg.redis + '/1'),
        duration: 60000,
        errorMessage: '<h1>Error 429: Too many requests!</h1>',
        id: (ctx) => ctx.ip,
        max: 100,
        disableHeader: true,
    });

    module.exports.auth = ratelimit({
        db: new Redis(cfg.redis + '/2'),
        duration: 60000,
        errorMessage: '<h1>Error 429: Too many requests!</h1>',
        id: (ctx) => ctx.ip,
        max: 5,
        disableHeader: true,
    });
} else {
    let idle = async (ctx, next) => await next();
    module.exports.global = idle;
    module.exports.auth = idle;
}
