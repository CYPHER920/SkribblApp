
const Room = require('../models/Room')

function socketHandler(io) {
    io.on('connection', (socket) => {
        console.log('User connected:', socket.id);

        socket.on('disconnect', () => {
            console.log("User disconnected:", socket.id);
        });
    });
}

socket.on('join-room', async ({ roomId, userId }) => {

    socket.join(roomId); // add this socket to the room group

    // 2. remember which room and user this socket belongs to
    socket.roomId = roomId;
    socket.userId = userId;

})

module.exports = socketHandler;