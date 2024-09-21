const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const connectDB = require('./config/db'); // Import de la configuration MongoDB

// Connexion à MongoDB
connectDB();
// Route pour rediriger vers Google pour l'authentification
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Callback Google après l'authentification
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Générer un token JWT
    const token = jwt.sign({ userId: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    // Retourner le token au client
    res.json({ token });
  }
);

module.exports = router;