const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  sex: String,
  points: Number,
  dangerousAge: Boolean,
  chronicDiseases: Boolean,
  contact: Boolean,
});

module.exports = mongoose.model('User', UserSchema);
