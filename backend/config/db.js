const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const conntectDB =  async () => { 
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("MongoDB connection error:", error);

    }
};

module.exports = conntectDB;