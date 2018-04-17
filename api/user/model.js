var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var schema = new Schema({
    email: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    username: { type: String, required: true, lowercase: true, trim: true, index: { unique: true } },
    password: { type: String, required: true, select: false },
    // hash: { type: String, required: true, select: false },
    // Security
    resetToken: { type: String, select: false },
    accessLog: [],
    access: {
        isAdmin: { type: Boolean, default: false },
    },
    emailToken: String,
    // Data
    personal: {
        name: String,
        birthdate: Date,
    },
    characters: [{type: Schema.Types.ObjectId, ref: 'Character'}],
    charactersMax: { type: Number, default: 1 },
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
