const multer = require('multer');

// Usamos memoryStorage para que o Sharp processe a imagem antes de salvá-la no disco
const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.match(/^image\/(jpeg|png|webp)$/)) {
      cb(null, true);
    } else {
      cb(new Error('Formato de imagem inválido. Envie JPEG, PNG ou WebP.'));
    }
  }
});

module.exports = upload;