
const mongoose = require('mongoose');


const connectDB = async () => {

    try {
        mongoose.connect(process.env.MONGO_URL);
        console.log('MongoDB connected ');
    }
    catch (e) {
        console.error('MongoDB connection failed', err.message);
    }
}

module.exports = connectDB;