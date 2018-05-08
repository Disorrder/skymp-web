var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    ip: {type: String, required: true, index: { unique: true }},
    amount: {type: Number, default: 0}
}, { timestamps: true });

schema.methods.timeDiff = function() {
    return (Date.now() - this.updatedAt) / 1000;
};

var AuthAttempt = mongoose.model('AuthAttempt', schema);

module.exports = AuthAttempt;
