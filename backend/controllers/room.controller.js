
const Room = require('../models/Room')
const { nanoid } = require('nanoid')
const User = require('../models/User')
async function createroom(req, res) {

    const { rounds, players } = req.body;
    console.log(req.userid);

    const user = await User.findById(req.userid);
    console.log(user.username);
    const room = await Room.create({
        host: req.userid, maxRounds: rounds, maxPlayers: players, roomId: nanoid(5),
        players: [{
            userId: req.userid,
            username: user.username,
            socketId: 'check',
            isHost: true
        }]
    })
    res.status(200).json({
        message: 'Room created successfully',
        roomId: room.roomId
    });
}

async function getRooms(req, res) {
    try {
        const rooms = await Room.find({ status: 'waiting' })
            .select('roomId players maxPlayers maxRounds status')
            .sort({ createdAt: -1 });

        res.status(200).json({ rooms });

    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

async function getRoom(req, res) {
    try {
        const id = req.query.roomid;
        console.log(id)
        const room = await Room.findOne({ roomId: id });

        if (!room) {
            return res.status(404).json({ message: 'Room not found' });
        }
        return res.status(200).json({ room });
    }
    catch (err) {
        consol.log(err.message);
    }
}


async function joinroom(req, res) {
    const roomId = req.query.roomid;
    const userId = req.userid;
    const user = await User.find(userId);
    if (!user) {
        return res.status(401).json({ msg: "user doesn't exist" });
    }
    const room = await Room.find(roomid);
    if (!room) {
        return res.status(401).json({ msg: "room doesn't exist" });
    }
    if (room.status != 'waiting') {
        return res.status(401).json({ msg: "game has started!" });
    }
    if (room.players.length == room.maxPlayer) {
        return res.status(402).json({ msg: "room is full" });
    }
}

module.exports = { createroom, joinroom, getRooms, getRoom, joinroom }