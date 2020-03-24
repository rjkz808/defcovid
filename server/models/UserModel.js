const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  points: Number,
});

module.exports = mongoose.model('User', UserSchema);
