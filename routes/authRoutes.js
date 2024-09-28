const express = require('express');
const { googleLogin } = require('../controllers/authController');
const router = express.Router();

// Route pour gérer le login Google à partir de l'application mobile
router.post('/google-login', googleLogin);

module.exports = router;
