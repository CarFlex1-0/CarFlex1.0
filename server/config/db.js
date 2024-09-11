const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

let dbConnection;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Database Connected...');
    dbConnection = conn;
  } catch (error) {
    process.exit(1);
  }
};

const getDB = async () => {
  if (!dbConnection) {
    await connectDB(); // Connect to the database if not already connected
  }
  return dbConnection.connection;
};

module.exports = { connectDB, getDB };