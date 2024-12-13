const { Router } = require('express');
const { hotelsController } = require('../controllers/index');
const { uploadPhoto } = require('../middleware/upload');

const hotelRouter = Router();

hotelRouter.route('/').get(hotelsController.getHotels);

hotelRouter
  .route('/:hotelId')
  .get(hotelsController.getHotelById)
  .patch(hotelsController.updateHotelById)
  .delete(hotelsController.deleteHotelById);

hotelRouter.patch(
  '/:hotelId/images',
  uploadPhoto,
  hotelsController.updateImage
);

module.exports = hotelRouter;
