
const mongoose = require('mongoose');
const User = require('./User')
const PlayerSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: User },
    username: { type: String, required: true },
    socketId: { type: String, required: true },
    isHost: { type: Boolean, default: false },
    hasGuessed: { type: Boolean, default: false },
    isReady: { type: Boolean, default: false },
    score: { type: Number, default: 0 }
});

const RoomSchema = new mongoose.Schema({
    roomId: { type: String, required: true, unique: true },
    host: { type: mongoose.Schema.Types.ObjectId, ref: User },
    players: { type: [PlayerSchema], default: [] },
    status: { type: String, enum: ['waiting', 'playing', 'ended'], default: 'waiting' },
    currentWord: { type: String, default: '' },
    currentDrawer: { type: String, default: '' },
    round: { type: Number, default: 1 },
    maxRounds: { type: Number, default: 3 },
    timeLeft: { type: Number, default: 80 },
    maxPlayers: { type: Number, default: 5 },
}, { timestamps: true });

const Room = mongoose.model('Room', RoomSchema);
module.exports = Room;