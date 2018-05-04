var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, require: true, unique: true},
    type: String, // one of 'local', 'alpha', 'beta', 'production'
    ip: String,
    maxPlayers: Number,
}, { timestamps: true, strict: false });

var Server = mongoose.model('Server', schema);

module.exports = Server;
