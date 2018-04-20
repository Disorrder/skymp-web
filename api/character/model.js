var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    name: {type: String, require: true, unique: true},
    server: {type: Schema.Types.ObjectId, ref: 'Server', require: true},
    owner: {type: Schema.Types.ObjectId, ref: 'User', require: true},
    photo: String,
    isBanned: Boolean,

    race: String,
    class: String,
    level: Number,
    exp: Number,
    rank: Number,
    reputation: Number,
    // guild: {type: Schema.Types.ObjectId, ref: 'Guild'},

    money: Number,
    equipment: String,
    inventoryStr: String,
    mails: [],

    position: {x: Number, y: Number, z: Number},
    angle: Number, // rotation
    look: String, // внешний вид

    avs: String,
    perks: String,
    magic: String,
    learnedEffects: String,

    // stats: {}
}, { timestamps: true, strict: false });

var Character = mongoose.model('Character', schema);

module.exports = Character;
