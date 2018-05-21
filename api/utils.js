const availableChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

String.randomize = function(len) {
    var str = "";
    for (let i = 0; i < len; i++) {
        str += availableChars.charAt(Math.floor(Math.random() * availableChars.length));
    }
    return str;
};

// {"foo": "bar", "params[a]": 1, "params[b]": 2, "params[c][d]": 3}
function remapPhpQuery(query) {
    var newQuery = {};
    for (let k in query) {
        let key = k.replace(/\[(\w+)\]/g, ".$1");
        if (!~key.indexOf('.')) {
            newQuery[k] = query[k];
            continue;
        };

        let keys = key.split('.');
        let lastKey = keys.pop();
        let _obj = newQuery;
        keys.forEach((v, i) => {
            if (!_obj[v]) _obj[v] = {};
            _obj = _obj[v];
        });
        _obj[lastKey] = query[k];
    }
    return newQuery;
}
global.remapPhpQuery = remapPhpQuery;
