const Model = require('./model');
const Router = require('koa-router');
var router = new Router();

router.post('/add', async (ctx) => {
    return ctx.throw(501);
    
});

router.get('s/my', async (ctx) => {
    return ctx.throw(501);

});

router.put('/:id', async (ctx) => {
    return ctx.throw(501);

});

router.get('/notify', async (ctx) => {
    console.log('payment notify', ctx.query);
});
