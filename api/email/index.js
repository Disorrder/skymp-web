const Router = require('koa-router');
var router = new Router();

const pug = require('pug');
const path = require('path');

router.get('/view/:name', async (ctx) => {
    var locals = {
        user: {username: 'Usrnm'},
    };
    var file = path.resolve(__dirname, `./templates/${ctx.params.name}.pug`)
    ctx.body = pug.compileFile(file)(locals);
});

module.exports = router;
