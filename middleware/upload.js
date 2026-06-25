const multer = require('multer');
const path = require('path');

// Сақтау конфигурациясы
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads"),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext); // уникальный ат
  },
});

// Фильтр: тек суреттер
const fileFilter = (req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Тек сурет файлдары рұқсат етілген'));
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
