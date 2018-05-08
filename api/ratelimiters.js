const cfg = require('./config');
const Ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');

let redisIndex = 1;

let ratelimiters = {
    // documentation: https://github.com/koajs/ratelimit

    global: Ratelimit({
        db: Redis(cfg.redis + '/' + redisIndex++),
        duration: 60000,
        errorMessage: '<h1>Error 429: Too many requests!</h1>',
        id: (ctx) => ctx.ip,
        max: 100,
        disableHeader: true,
    }),
    auth: Ratelimit({
        db: Redis(cfg.redis + '/' + redisIndex++),
        duration: 60000,
        errorMessage: '<h1>Error 429: Too many requests!</h1>',
        id: (ctx) => ctx.ip,
        max: 5,
        disableHeader: true,
    })
}

module.exports = ratelimiters;
