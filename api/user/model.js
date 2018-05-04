var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var schema = new Schema({
    email: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    username: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    // Security
    confirmToken: { type: String, select: false },
    resetToken: { type: String, select: false },
    accessLog: [],
    access: {
        isConfirmed: { type: Boolean, default: false },
        isAdmin: { type: Boolean, default: false },
    },
    // Data
    personal: {
        name: String,
        birthdate: Date,
    },
    // characters: [],
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    charactersMax: { type: Number, default: 1 },
    skyPoints: { type: Number, default: 0 },
    gifts: [],
    // Social networks
    vk: Schema.Types.Mixed,
    fb: Schema.Types.Mixed,
    // Preferences
    preferences: {
        // emailTypes: Schema.types.Mixed
    }
}, { timestamps: true });

schema.methods.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

schema.pre('save', async function() {
    if (!this.isModified('password')) return;
    this.password = bcrypt.hashSync(this.password, 10); // 10 - salt work factor
});

var User = mongoose.model('User', schema);

module.exports = User;
