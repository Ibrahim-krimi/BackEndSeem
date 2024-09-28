const multer = require('multer');

// Configuration de Multer pour l'upload des fichiers
const storage = multer.memoryStorage(); // Stocker le fichier temporairement en mémoire
const upload = multer({
  storage,
  limits: {
    fileSize: 24 * 1024 * 1024, // Limite de taille du fichier à 5MB
    files: 7, // Limiter à 7 fichiers

  },
});

module.exports = upload;
