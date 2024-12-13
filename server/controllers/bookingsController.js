const createHttpError = require('http-errors');
const { Client, Tour, Booking } = require('../models');
const _ = require('lodash');

module.exports.createBooking = async (req, res, next) => {
  const { clientData, bookingData } = req.body;

  try {
    if (!clientData || !bookingData) {
      return next(createHttpError(400, 'Invalid data provided.'));
    }

    const [client] = await Client.findOrCreate({
      where: { CL_Email: clientData.CL_Email },
      defaults: clientData,
    });

    const createdBooking = await Booking.create({
      ...bookingData,
      BK_CL_ID: client.CL_ID,
    });

    const preparedBooking = _.omit(createdBooking.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedBooking });
  } catch (err) {
    next(err);
  }
};

module.exports.getAllBooking = async (req, res, next) => {
  const { page = 1, limit = 10 } = req.query;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return next(createHttpError(400, 'Invalid page number.'));
  }
  if (isNaN(parsedLimit) || parsedLimit < 1) {
    return next(createHttpError(400, 'Invalid limit number.'));
  }

  const offset = (parsedPage - 1) * parsedLimit;

  try {
    const booking = await Booking.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: parsedLimit,
      offset,
      raw: true,
    });

    const totalBooking = await Booking.count();

    res.status(200).send({
      data: booking,
      total: totalBooking,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getBookingById = async (req, res, next) => {
  const { bookingId } = req.params;

  try {
    const booking = await Booking.findByPk(bookingId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    });

    if (!booking) {
      return next(createHttpError(404, 'Booking not found.'));
    }

    res.status(200).send({ data: booking });
  } catch (err) {
    next(err);
  }
};

module.exports.updateBookingById = async (req, res, next) => {
  const { bookingId } = req.params;
  const updateData = req.body;

  try {
    const [, [updatedBooking]] = await Booking.update(updateData, {
      where: { BK_ID: bookingId },
      raw: true,
      returning: true,
    });

    if (!updatedBooking) {
      return next(createHttpError(404, 'Booking not found.'));
    }

    const preparedBooking = _.omit(updatedBooking, ['createdAt', 'updatedAt']);
    res.status(200).send({ data: preparedBooking });
  } catch (err) {
    next(err);
  }
};

module.exports.deleteBookingById = async (req, res, next) => {
  const { bookingId } = req.params;

  try {
    const deletedCount = await Booking.destroy({
      where: { BK_ID: bookingId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Booking not found.'));
    }

    res.status(204).end();
  } catch (err) {
    next(err);
  }
};
