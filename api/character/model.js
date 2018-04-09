var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// const Mixed = Schema.Types.Mixed;
// const ObjectId = Schema.Types.ObjectId;

var schema = new Schema({
    name: String,
    serverName: String,
    ownerId: Schema.Types.ObjectId,

    position: {x: Number, y: Number, z: Number},
    angle: Number, // rotation
    look: String,
    avs: String,
    perks: String,
    magic: String,
    inventoryStr: String,
    learnedEffects: String,
    equipment: String,
}, { timestamps: true });

var Character = mongoose.model('Character', schema);

module.exports = Character;
