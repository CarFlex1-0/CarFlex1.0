const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('../models/user');
dotenv.config();

let dbConnection;
// const users = [
//   {
//     "firstName": "John",
//     "lastName": "Doe",
//     "username": "john_doe",
//     "bio": "I am a software developer specializing in backend systems.",
//     "phoneNum": "123-456-7890",
//     "email": "john@example.com",
//     "password": "$2a$10$sJH8DghsIhdJxw2I.HfViOk.CDzZ9t4QrlBCAVPpeblAXZO23YdK2", // hashed password "password123"
//     "imageUrl": "https://via.placeholder.com/150",
//     "blogsList": [],
//     "isAdmin": false,
//     "createdAt": "2024-08-10T10:00:00.000Z",
//     "updatedAt": "2024-08-10T10:00:00.000Z"
//   },
//   {
//     "firstName": "Jane",
//     "lastName": "Smith",
//     "username": "jane_smith",
//     "bio": "Frontend engineer passionate about building responsive UIs.",
//     "phoneNum": "987-654-3210",
//     "email": "jane@example.com",
//     "password": "$2a$10$sJH8DghsIhdJxw2I.HfViOk.CDzZ9t4QrlBCAVPpeblAXZO23YdK2", // hashed password "password123"
//     "imageUrl": "https://via.placeholder.com/150",
//     "blogsList": [],
//     "isAdmin": false,
//     "createdAt": "2024-08-12T12:00:00.000Z",
//     "updatedAt": "2024-08-12T12:00:00.000Z"
//   },
//   {
//     "firstName": "Alice",
//     "lastName": "Johnson",
//     "username": "alice_johnson",
//     "bio": "AI researcher and data scientist.",
//     "phoneNum": "555-123-4567",
//     "email": "alice@example.com",
//     "password": "$2a$10$sJH8DghsIhdJxw2I.HfViOk.CDzZ9t4QrlBCAVPpeblAXZO23YdK2", // hashed password "password123"
//     "imageUrl": "https://via.placeholder.com/150",
//     "blogsList": [],
//     "isAdmin": false,
//     "createdAt": "2024-08-15T15:00:00.000Z",
//     "updatedAt": "2024-08-15T15:00:00.000Z"
//   },
//   {
//     "firstName": "Bob",
//     "lastName": "Williams",
//     "username": "bob_williams",
//     "bio": "Full-stack developer with a love for JavaScript.",
//     "phoneNum": "123-555-7890",
//     "email": "bob@example.com",
//     "password": "$2a$10$sJH8DghsIhdJxw2I.HfViOk.CDzZ9t4QrlBCAVPpeblAXZO23YdK2", // hashed password "password123"
//     "imageUrl": "https://via.placeholder.com/150",
//     "blogsList": [],
//     "isAdmin": true,
//     "createdAt": "2024-08-20T20:00:00.000Z",
//     "updatedAt": "2024-08-20T20:00:00.000Z"
//   },
//   {
//     "firstName": "Charlie",
//     "lastName": "Brown",
//     "username": "charlie_brown",
//     "bio": "DevOps specialist, helping automate everything.",
//     "phoneNum": "444-555-6789",
//     "email": "charlie@example.com",
//     "password": "$2a$10$sJH8DghsIhdJxw2I.HfViOk.CDzZ9t4QrlBCAVPpeblAXZO23YdK2", // hashed password "password123"
//     "imageUrl": "https://via.placeholder.com/150",
//     "blogsList": [],
//     "isAdmin": false,
//     "createdAt": "2024-08-25T18:00:00.000Z",
//     "updatedAt": "2024-08-25T18:00:00.000Z"
//   }
// ]

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    // await User.insertMany(users);
    // console.log('Dummy users inserted');
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