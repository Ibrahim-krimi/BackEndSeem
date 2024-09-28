require('dotenv').config();
const express = require('express');
const passport = require('passport');
const session = require('express-session');
require('./config/passport'); 
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

// Connexion à MongoDB
connectDB();

const app = express();

app.use(express.json());


// Middleware pour les sessions
app.use(session({ 
  secret: 'secret', 
  resave: false, 
  saveUninitialized: false 
}));

// Initialisation de Passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/api/users', userRoutes);

// Démarrage du serveur
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
