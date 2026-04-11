
const Room = require('../models/Room')


module.exports = (io) => {

    io.on('connection', (socket) => {
        console.log("User connected: ", socket.id);

        /// --------------------Join Room------------------------------------------///
        socket.on('join-room', async ({ username, roomid }) => {
            console.log(`username : ${username} room id :${roomid}`)
            // 1. add this socket to the room group
            socket.join(roomid);
            socket.broadcast.to(roomid).emit('user-connected', { username });
            // // 2. remember which room and user this socket belongs to
            // socket.roomId = roomId;
            // socket.userId = userId;
            // // 3. find the room in MongoDB
            // const room = await Room.findOne({ roomId });
            // if (!room) {
            //     socket.emit('error', { message: "Room doesn't exist" });
            //     return;
            // }
            // // 4. update this player's socketId in MongoDB
            // const player = room.players.find(
            //     (p) => p.userId.toString() === userId.toString()
            // );

            // if (player) {
            //     player.socketId = socket.id;
            //     await room.save();
            // }
            // io.to(roomId).emit('room-update', room);
        });
    });

}



