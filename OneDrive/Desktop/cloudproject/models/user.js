const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Add your user schema fields here
});

const User = mongoose.model('User', userSchema);

module.exports = User;
