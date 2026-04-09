
require('dotenv').config();
const express = require('express')
const connectDb = require('./db')
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io')
const cookieParser = require('cookie-parser');
const app = express();
// middleware section

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

app.use(cookieParser()); // for cookie parsing

connectDb(); // connecting DB

/// routes
const routes = require('./routes/auth.routes');

app.use('/api/v1', routes);
app.get('/', (req, res) => {
    res.send({ msg: "Home " });
})

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});
// require('./socket/gameEvents')(io);
const GameEvents = require('./socket/gameEvents');
GameEvents(io);/// passing io 
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});