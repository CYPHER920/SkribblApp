const Room = require('../models/Room')

module.exports = (io) => {

    io.on('connection', (socket) => {
        // console.log("User connected: ", socket.id);

        /// --------------------Join Room------------------------------------------///
        socket.on('join-room', async ({ username, roomid }) => {

            socket.join(roomid);
            const room = await Room.findOne({ roomId: roomid });
            if (room) {
                room.players.map((player) => {
                    if (player.username === username) {
                        player.socketId = socket.id;
                    }
                })
                await room.save();
            }
            socket.broadcast.to(roomid).emit('user-connected', { username });

        });

        /// --------------------Player Ready---------------------------------------///
        socket.on('player-ready', async ({ roomid, username, isReady }) => {
            console.log(`[player-ready] Received from ${username} for room ${roomid}. State: ${isReady}`);
            try {
                const room = await Room.findOne({ roomId: roomid });
                console.log(`[player-ready] Room found:`, !!room);
                if (room) {
                    const player = room.players.find(p => p.username === username);
                    // console.log(`[player-ready] Player found inside room:`, !!player);
                    if (player) {
                        player.isReady = isReady;
                        // Mark modified explicitly just in case Mongoose subdocument tracking is failing
                        room.markModified('players');
                        await room.save();
                        // console.log(`[player-ready] Saved to DB. Broadcasting player-ready-changed...`);
                        socket.broadcast.to(roomid).emit('player-ready-changed', { username, isReady });
                    }
                }
            } catch (e) {
                console.error("[player-ready] Error:", e);
            }

        });

        //////////////////// Leave - Room ///////////////////
        socket.on('Leave-room', async ({ username, id }) => {
            const room = await Room.findOne({ roomId: id });
            if (!room) {
                console.error("Room doesn't exist!");
                return;
            }
            const players = room.players.filter((p) => {
                if (p.username !== username) {
                    return true;
                }
            });
            room.players = players;
            await room.save();

            socket.leave(id); // Leave the socket room
            if (players.length == 0) {
                await Room.deleteOne({ roomId: id });
            }
            socket.broadcast.to(id).emit('player-left', { players });
        })


        //////////////////////////GAME////////////////////////
        socket.on('start-game', ({ id }) => {

            socket.to(id).emit('game-started');

        })

        socket.on('gameinfo', async ({ id }) => {
            const room = await axios.get('http//:localhost:4000/api/v1/getroom', {
                params: { roomid: id },
                withCredentials: true
            });
        })


        ////////////////////////Chat/////////////////////////
        socket.on('chats', ({ username, chatText, id }) => {

            socket.to(id).emit('chats', { username, chatText });
            console.log(chatText);
        })

    });

}



