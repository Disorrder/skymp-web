var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    status: String,
    user: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    amount: Number,
    profit: {type: Number, select: false},
    data: Schema.Types.Mixed,
}, { timestamps: true });

var Payment = mongoose.model('Payment', schema);

module.exports = Payment;
