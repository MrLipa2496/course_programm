const { Router } = require('express');
const { bookingsController } = require('../controllers');

const bookingRouter = Router();

bookingRouter
  .route('/')
  .get(bookingsController.getAllBooking)
  .post(bookingsController.createBooking);

bookingRouter
  .route('/:bookingId')
  .get(bookingsController.getBookingById)
  .patch(bookingsController.updateBookingById)
  .delete(bookingsController.deleteBookingById);

module.exports = bookingRouter;
