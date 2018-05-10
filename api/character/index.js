var request = require('request-promise-native');
const Model = require('./model');
const Server = require('../server/model');
const Router = require('koa-router');
var router = new Router();

router.use((ctx, next) => {
    if (!ctx.isAuthenticated()) return ctx.throw(401);
    return next();
});

router.post('/add', async (ctx) => {
    // Create one
    if (ctx.state.user.characters.length >= ctx.state.user.charactersMax) ctx.throw(403);
    var access = ctx.state.user.access;
    if (!access.isTester) ctx.throw(403, 'ERR_NO_ACCESS');

    var data = ctx.request.body;
    data.owner = ctx.state.user._id.toString();

    var server = await Server.findById(data.server);
    if (!server) return ctx.throw(400, 'ERR_INVALID_SERVER');
    let serverUrl = 'http://' + server.ip.replace(/:\d+$/, ":10000");
    console.log(serverUrl);

    try {
        console.log('CREATE CHAR', data);
        var char = await request.post(serverUrl+'/character/add').form(data);
        console.log('CREATED CHAR', char);
        char = JSON.parse(char);
        var item = new Model(char);
        console.log('CREATED CHAR CACHE', item);
        item.save();
        ctx.state.user.characters.push(char._id);
        ctx.state.user.save();
    } catch (e) {
        console.log(e.statusCode, e.message);
        if (e.error === 'ERR_DUPLICATE') return ctx.throw(400, 'ERR_DUPLICATE_CHARACTER');

        // TODO: wrap in function
        if (e.code) return ctx.throw(400, e.message);
        if (e.statusCode) return ctx.throw(e.statusCode, e.error);
        return ctx.throw(e);
    }

    ctx.body = char;
});

// TODO: request all servers /refresh
router.get('s', async (ctx) => {
    // get array of users's characters
    var list = ctx.state.user.characters.map(async (id) => {
        console.log(id);
        return await Model.findById(id);
    });
    list = await Promise.all(list).then((res) => {
        console.log('chars', res);
        return res;
    });
    ctx.body = list;
});

// legacy, thinking
router.get('/:id', async (ctx, next) => {
    var isOwner = ctx.state.user.characters.some((id) => {
        return id.equals(ctx.params.id);
    });
    if (!isOwner) return ctx.throw(403);

    var item = await Model.findById(ctx.params.id);
    if (!item) return ctx.throw(404);
    ctx.body = item;
});

router.put('/:id', async (ctx) => {
    var isOwner = ctx.state.user.characters.some((id) => {
        return id.equals(ctx.params.id);
    });
    if (!isOwner) return ctx.throw(403);

    var data = ctx.request.body;
    try {
        var item = await Model.findByIdAndUpdate({_id: ctx.params.id}, data, {new: true});
    } catch(e) {
        console.log(e, e.message);
        ctx.throw(500, e.message);
    }
    if (!item) return ctx.throw(404);

    ctx.body = item;
});

router.get('/:id/play', async (ctx) => {
    var isOwner = ctx.state.user.characters.some((id) => {
        return id.equals(ctx.params.id);
    });
    if (!isOwner) return ctx.throw(403);

    var item = await Model.findById(ctx.params.id).populate('server');
    if (!item) return ctx.throw(404);

    let serverUrl = 'http://' + item.server.ip.replace(/:\d+$/, ":10000");
    let accessToken = {
        ip: ctx.ip,
        time: Date.now(),
        random: String.randomize(8),
        // random: Math.random().toString(36).substr(2)
    };
    accessToken = btoa( JSON.stringify(accessToken) );
    try {
        let char = await request.put(serverUrl+`/character/${item.id}`).form({accessToken});
    } catch(e) {
        console.log('/play', char, e);
        return ctx.throw(500);
    }
    ctx.body = accessToken;
});

module.exports = router;
