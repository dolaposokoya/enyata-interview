const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: { type: String },
    email: { type: String, unique: true },
    password: { type: String },
    refreshToken: { type: String, },
}, {
    versionKey: false,
    timestamps: true
});

const user = mongoose.model('user', userSchema)

module.exports = user
