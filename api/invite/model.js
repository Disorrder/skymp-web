var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    code: {type: String, require: true, unique: true},
    activatedBy: {type: Schema.Types.ObjectId, ref: 'User', dafault: null},
}, { timestamps: true, strict: false });

var InviteCode = mongoose.model('InviteCode', schema);

module.exports = InviteCode;
