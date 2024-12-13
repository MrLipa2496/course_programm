const { Router } = require('express');
const toursRouter = require('./toursRouter');
const transportsRouter = require('./transportsRouter');
const hotelRouter = require('./hotelsRouter');
const bookingRouter = require('./bookingsRoutes');
const clientRouter = require('./clientsRoutes');
const receiptRouter = require('./receiptRouter');

const router = Router();

router.use('/tours', toursRouter);

router.use('/transportations', transportsRouter);

router.use('/hotels', hotelRouter);

router.use('/bookings', bookingRouter);

router.use('/clients', clientRouter);

router.use('/send-receipt', receiptRouter);

module.exports = router;
