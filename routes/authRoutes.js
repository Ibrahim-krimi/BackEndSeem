const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Route pour rediriger vers Google pour l'authentification
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }) // Ajouter les scopes ici
);

// Callback après l'authentification Google
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // Vérifier si l'utilisateur est authentifié avec succès
    if (!req.user) {
      return res.status(401).json({ message: "Échec de l'authentification." });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: req.user._id },
      process.env.JWT_SECRET, // Clé secrète pour signer le JWT
      { expiresIn: '1d' } // Le token expire après 1 jour
    );

    // Retourner le token au client
    res.json({ token });
  }
);

module.exports = router;
