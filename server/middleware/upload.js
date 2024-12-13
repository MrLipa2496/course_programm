const path = require('node:path');
const fs = require('node:fs');
const multer = require('multer');
const createHttpError = require('http-errors');
const { STATIC_IMAGES_PATH } = require('./../constants');

if (!fs.existsSync(STATIC_IMAGES_PATH)) {
  fs.mkdirSync(STATIC_IMAGES_PATH, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.env.STATIC_FOLDER, 'images'));
  },
  filename: function (req, file, cb) {
    const extension = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + Date.now() + extension);
  },
});

function fileFilter (req, file, cb) {
  const MIMETYPE_REG_EXP = /^image\/(gif|png|jpeg)$/;

  // Якщо тип файлу допустимий, то зберігаємо
  if (MIMETYPE_REG_EXP.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(createHttpError(415, 'Support only jpeg/png/gif mimetypes'));
}

const upload = multer({ storage, fileFilter });

module.exports.uploadPhoto = upload.single('tourPhoto');
