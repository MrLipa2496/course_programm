const { Router } = require('express');
const { receiptController } = require('../controllers');

const receiptRouter = Router();

receiptRouter.route('/').post(receiptController.sendReceipt);

module.exports = receiptRouter;
