// config/dbConnection.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDb = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Connected to the database', dbConnection.connection.host,dbConnection.connection.name);
    } catch (error) {
        console.error('Database connection error:', error.message);
        // Throw the error to be caught in the main application
        throw error;
    }
};

module.exports = connectDb;
