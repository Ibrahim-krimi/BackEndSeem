const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Fonction pour gérer l'inscription ou la connexion via Google
exports.googleLogin = async (req, res) => {
  try {
    const {  email  } = req.body;

    // Vérifier si l'utilisateur est déjà inscrit via le nickname (ou un autre identifiant unique)
    let user = await User.findOne({ email });

    if (user) {
      // Utilisateur déjà inscrit
      // Générer un token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      // Retourner le user déjà rempli et le token
      return res.json({
        message: 'Utilisateur déjà inscrit',
        user,
        token,
      });
    } else {
      // Nouvel utilisateur : enregistrer les informations reçues
      user = new User({
        email
      });

      // Sauvegarder le nouvel utilisateur dans la base de données
      await user.save();

      // Générer un token JWT
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
      });

      // Retourner le nouvel utilisateur et le token
      return res.json({
        message: 'Nouvel utilisateur enregistré',
        user: {
            email: user.email,
        },
        token,
      });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};
