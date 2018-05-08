const cfg = require('./config');
const ratelimit = require('koa-ratelimit');
const Redis = require('ioredis');

// documentation: https://github.com/koajs/ratelimit

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
