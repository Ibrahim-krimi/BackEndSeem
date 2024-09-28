const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
  age: {
    type: Number,
  },
  profileImage: {
    type: String,
  },
  phoneNumber: {
    type: String,
  },
  country: {
    type: String,
  },
  city: {
    type: String,
  },
  bio: {
    type: String,
  },
  interests: {
    type: [String], // Tableau de mots-clés (ex. cinéma, sport, techno)
  },
  emailValid: {
    type: Boolean,
  },
  phoneNumberValid: {
    type: Boolean,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  images: {
    type: [String], // Tableau contenant les URLs des images
  },
});

const User = mongoose.model('User', userSchema);
module.exports = User;
