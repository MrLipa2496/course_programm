const { Router } = require('express');
const { clientsController } = require('../controllers');

const clientRouter = Router();

clientRouter
  .route('/')
  .get(clientsController.getClient)
  .post(clientsController.createClient);

clientRouter
  .route('/:clientId')
  .get(clientsController.getClientById)
  .patch(clientsController.updateClientById)
  .delete(clientsController.deleteClientById);

module.exports = clientRouter;
