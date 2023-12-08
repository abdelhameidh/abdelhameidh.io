const express = require('express');
const mongoose = require('mongoose');

const connectToMongoDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://mongodatabase6:mongodb123@cluster0.Itsmsm6.mongodb.net/', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000, // Increase the timeout value to 30 seconds
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

// Connect to MongoDB
connectToMongoDB();

// Rest of the code...
