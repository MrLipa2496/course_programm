const { Router } = require('express');
const { transportsController } = require('../controllers/index');
const { uploadPhoto } = require('../middleware/upload');

const transportRouter = Router();

transportRouter.route('/').get(transportsController.getTransportations);

transportRouter
  .route('/:transportationId')
  .get(transportsController.getTransportationById)
  .patch(transportsController.updateTransportationById)
  .delete(transportsController.deleteTransportationById);

transportRouter.patch(
  '/:transportationId/images',
  uploadPhoto,
  transportsController.updateImage
);

module.exports = transportRouter;
