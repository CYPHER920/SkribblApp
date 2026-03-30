const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true, // trims space from start and end
        lowercase: true // automatically converts into lowercase
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }, avatar: {
        type: String,
        default: ''
    },
    totalScore: {
        type: Number,
        default: 0
    },
    gamesPlayed: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;

