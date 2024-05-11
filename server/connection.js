const mongoose = require('mongoose');
require('dotenv').config();

// Retrieve MongoDB connection URI from environment variables
const dbURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@cluster0.ecmlyzs.mongodb.net/MernChat`;

// Connect to MongoDB using async/await
async function connectToDatabase() {
  try {
    await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
}

// Call the async function to establish the connection
connectToDatabase();
