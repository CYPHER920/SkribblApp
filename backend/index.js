
require('dotenv').config();
const express = require('express')
const connectDb = require('./db')
const cors = require('cors')
const http = require('http');
const { Server } = require('socket.io')
// middleware section
const app = express();
app.use(cors());
app.use(express.json());

connectDb();
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
require('./socket/gameEvents')(io);
const PORT = process.env.PORT || 4000;
httpServer.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});