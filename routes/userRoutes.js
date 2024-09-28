const express = require('express');
const { getUser, updateUser, deleteUser,getUserPhotos } = require('../controllers/UserController');
const {uploadUserPhotos } = require('../controllers/userfileController');
const router = express.Router();
const upload = require('../middleware/uploadMiddleware'); // Importer le middleware

// Route pour récupérer les informations de l'utilisateur
router.get('/:id', getUser);

// Route pour mettre à jour les informations de l'utilisateur
router.put('/:id', updateUser);

// Route pour supprimer un utilisateur
router.delete('/:id', deleteUser);

// Route pour supprimer un utilisateur
router.get('/:id', getUserPhotos);

// Route pour uploader plusieurs photos de l'utilisateur
router.post('/:id/photos', upload.array('photos', 7), uploadUserPhotos);

module.exports = router;
