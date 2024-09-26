const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connecté');
  } catch (err) {
    console.error('Erreur de connexion MongoDB:', err);
    process.exit(1); // Arrête l'application en cas d'erreur
  }
};

module.exports = connectDB;
