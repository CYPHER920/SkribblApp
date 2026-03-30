
require('dotenv').config();
const express = require('express')
const connectDb = require('./db')
const cors = require('cors')
const app = express();
// middleware section
app.use(cors());
app.use(express.json());

connectDb();
/// routes
const routes = require('./routes/auth.routes');

app.use('/api/v1', routes);
app.get('/', (req, res) => {
    res.send({ msg: "Home " });
})


app.listen(3000);