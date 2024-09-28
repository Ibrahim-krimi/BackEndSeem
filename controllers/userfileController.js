const ftp = require('basic-ftp');
const { Readable } = require('stream'); // Importer le module 'stream'
const User = require('../models/User');

exports.uploadUserPhotos = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    // Vérifier que des fichiers ont été téléchargés
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ msg: 'Aucun fichier téléchargé' });
    }

    // Connexion à BunnyCDN via FTP
    const client = new ftp.Client();
    client.ftp.verbose = true;

    let uploadedFiles = [];
    try {
      await client.access({
        host: process.env.BUNNY_FTP_HOST,
        user: process.env.BUNNY_FTP_USERNAME,
        password: process.env.BUNNY_FTP_PASSWORD,
        secure: false,
      });

      // Uploader chaque fichier vers BunnyCDN
      for (const file of req.files) {
        const fileName = `${userId}-${Date.now()}-${file.originalname}`;

        // Convertir le buffer en un stream lisible
        const fileStream = Readable.from(file.buffer);

        // Utiliser `uploadFrom` avec le stream du fichier
        await client.uploadFrom(fileStream, `${fileName}`);
        
        // Ajouter l'URL du fichier téléchargé à la liste
        uploadedFiles.push(`${process.env.BUNNY_PULL_ZONE_URL}/${fileName}`);
      }

      // Mettre à jour les photos de l'utilisateur (maximum 7)
      if (!user.images) {
        user.images = [];
      }
      user.images = user.images.concat(uploadedFiles).slice(0, 7); // S'assurer de ne jamais dépasser 7 photos
      await user.save();

      res.json({ msg: 'Photos téléchargées avec succès', images: user.images });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erreur lors du téléchargement vers BunnyCDN');
    } finally {
      client.close();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};
