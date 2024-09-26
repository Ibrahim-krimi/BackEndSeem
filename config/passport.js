const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'http://localhost:5000/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
        try {
            // Rechercher un utilisateur dans la base de données avec l'ID Google
            let user = await User.findOne({ googleId: profile.id });
            
            // Si l'utilisateur n'existe pas, le créer
            if (!user) {
                user = await User.create({
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,  // Correction ici
                    profileImage: profile.photos[0].value,
                });
            }

            done(null, user);
        } catch (e) {
            done(e, false);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id); // Utilisation de async/await
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
  
