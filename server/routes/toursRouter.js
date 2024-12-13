const { Router } = require('express');
const { toursController } = require('../controllers/index');
const { uploadPhoto } = require('../middleware/upload');

const toursRouter = Router();

toursRouter
  .route('/')
  .get(toursController.getTours)
  .post(uploadPhoto, toursController.createTour);

toursRouter
  .route('/:tourId')
  .get(toursController.getTourById)
  .patch(toursController.updateTourById)
  .delete(toursController.deleteTourById);

toursRouter.patch('/:tourId/images', uploadPhoto, toursController.updateImage);

module.exports = toursRouter;
