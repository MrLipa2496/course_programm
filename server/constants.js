require('dotenv').config();
const path = require('node:path');

const STATIC_FOLDER = path.resolve(process.env.STATIC_FOLDER);
const STATIC_IMAGES_FOLDER = 'images';

const CONSTANTS = {
  corsOptions: { origin: '*' },
  STATIC_PATH: path.resolve(STATIC_FOLDER),
  STATIC_IMAGES_FOLDER,
  STATIC_IMAGES_PATH: path.resolve(STATIC_FOLDER, STATIC_IMAGES_FOLDER),
};

module.exports = CONSTANTS;
