var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, require: true, unique: true},
    server: {type: Schema.Types.ObjectId, ref: 'Server', require: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', require: true},
}, { timestamps: true, strict: false });

var Character = mongoose.model('Character', schema);

module.exports = Character;
