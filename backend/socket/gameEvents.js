const Room = require('../models/Room')

const Words = ["Apple", "Car", "Boat", "Mountain", "River", "Phone", "Horse"];

const timers = {};

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
                // console.log(`[player-ready] Room found:`, !!room);
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
        socket.on('load-gamepage', ({ id }) => {

            socket.to(id).emit('page-loaded');

        })
        socket.on('start-game', async ({ id }) => {
            const room = await Room.findOne({ roomId: id });
            if (!room) {
                console.log("room doesn't exists");
                return;
            }
            room.status = 'playing';
            await room.save();
            runGameLoop(id); // calling game loop function
        })
        async function runGameLoop(id) {
            const room = await Room.findOne({ roomId: id });
            const maxRounds = room.maxRounds || 3;
            const timePerTurn = 15; // 60 seconds
            for (let currentRound = 1; currentRound <= maxRounds; currentRound++) {
                // console.log("backend: ", currentRound);
                io.to(id).emit('setround', { round: currentRound });
                for (let i = 0; i < room.players.length; i++) {
                    const currentPlayer = room.players[i];
                    const idx = Math.floor((Math.random() * 10) % Words.length);
                    const word = Words[idx];
                    room.currentWord = word;
                    await room.save();
                    io.to(id).emit('data', { word, player: currentPlayer });
                    let timeLeft = timePerTurn;
                    await new Promise((resolve) => {
                        if (timers[id]) {
                            clearInterval(timers[id]);
                        }
                        timers[id] = setInterval(() => {
                            timeLeft--;
                            io.to(id).emit('settime', { time: timeLeft });
                            if (timeLeft === 0) {
                                clearInterval(timers[id]);
                                io.to(id).emit('timeup', { player: currentPlayer });
                                resolve();
                            }
                        }, 1000)
                    });

                    await new Promise(resolve => setTimeout(resolve, 3000));
                }
            }
            // Game is completely finished
            io.to(id).emit('game-over');
            room.status = 'ended';
            await room.save();
        }
        ////////////////////////Word Guessed Check//////////////////


        socket.on('wordguesscheck', async ({ id, username, chatText, time }) => {
            const room = await Room.findOne({ roomId: id });
            const player = room.players.find((p) => p.username === username);
            const word = room.currentWord;
            const currWord = word.toLowerCase();
            const chatWord = chatText.toLowerCase();
            console.log(chatWord, currWord);
            if (chatWord === currWord) {
                console.log("scoer", player.score);
                if (time >= 7) {
                    let curr = player.score;
                    curr = curr + 10;
                    player.score = curr;
                    console.log(player.score);
                }
                else if (time >= 4 && time < 7) {
                    let curr = player.score;
                    curr = curr + 5;
                    player.score = curr;
                }
                else if (time >= 1 && time < 4) {
                    let curr = player.score;
                    curr = curr + 2;
                    player.score = curr;
                }
                await room.save();

                io.to(id).emit('word-guessed', { username });
            }
            else {
                io.to(id).emit('chats', { username, chatText });
            }
        })

        ////////////////////////Chat/////////////////////////
        // socket.on('chats', ({ username, chatText, id }) => {

        //     socket.to(id).emit('chats', { username, chatText });
        //     console.log(chatText);
        // })



        // ////////////////////////Chat/////////////////////////
        // socket.on('chats', ({ username, chatText, id }) => {

        //     socket.to(id).emit('chats', { username, chatText });
        //     console.log(chatText);
        // })

    });

}



