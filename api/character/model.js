var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const Mixed = Schema.Types.Mixed;
// const ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name: {type: String, require: true, unique: true},
    server: {type: Schema.Types.ObjectId, ref: 'Server', require: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    isBanned: Boolean,

    position: {x: Number, y: Number, z: Number},
    angle: Number, // rotation
    look: String,
    avs: String,
    perks: String,
    magic: String,
    inventoryStr: String,
    learnedEffects: String,
    equipment: String,
}, { timestamps: true, strict: false });

var Character = mongoose.model('Character', schema);

module.exports = Character;
