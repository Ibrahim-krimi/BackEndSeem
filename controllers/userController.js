const User = require('../models/User');

// Récupérer les informations de l'utilisateur
exports.getUser = async (req, res) => {
  try {
    // Récupérer l'utilisateur à partir de l'ID passé dans les paramètres de la requête
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Envoyer les informations de l'utilisateur
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Mettre à jour les informations de l'utilisateur
exports.updateUser = async (req, res) => {
  try {
    const { nickname, selectedDate, selectedGender, phoneNumber, country, city, bio, interests, emailValid, phoneNumberValid } = req.body;

    // Récupérer l'utilisateur à partir de l'ID
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Mettre à jour les informations de l'utilisateur
    user.nickname = nickname || user.nickname;
    user.selectedDate = selectedDate || user.selectedDate;
    user.selectedGender = selectedGender || user.selectedGender;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.country = country || user.country;
    user.city = city || user.city;
    user.bio = bio || user.bio;
    user.interests = interests || user.interests;
    user.emailValid = typeof emailValid !== 'undefined' ? emailValid : user.emailValid;
    user.phoneNumberValid = typeof phoneNumberValid !== 'undefined' ? phoneNumberValid : user.phoneNumberValid;

    // Sauvegarder les modifications
    await user.save();

    // Envoyer les informations mises à jour de l'utilisateur
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

// Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    // Récupérer l'utilisateur à partir de l'ID passé dans les paramètres de la requête
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: "Utilisateur non trouvé" });
    }

    // Supprimer l'utilisateur
    await user.remove();

    // Envoyer un message de confirmation
    res.json({ msg: "Utilisateur supprimé avec succès" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Erreur du serveur");
  }
};

exports.getUserPhotos = async (req, res) => {
    try {
      const userid = req.params.id;
      const user = await User.findById(userid);
      if (!user) {
        return res.status(404).json({ msg: 'Utilisateur non trouvé' });
      }
  
      // Envoyer les URLs des photos de l'utilisateur
      res.json({ images: user.images });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur du serveur');
    }
  };
  
