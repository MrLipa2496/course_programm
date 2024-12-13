const path = require('node:path');
const createHttpError = require('http-errors');
const _ = require('lodash');
const { STATIC_IMAGES_FOLDER } = require('../constants');
const { Hotel } = require('../models');

module.exports.createHotel = async (req, res, next) => {
  const { body } = req;

  try {
    const createdHotel = await Hotel.create(body);

    const preparedHotel = _.omit(createdHotel.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(201).send({ data: preparedHotel });
  } catch (err) {
    next(err);
  }
};

module.exports.getHotels = async (req, res, next) => {
  const {
    query: { page = 1, limit = 10 },
  } = req;

  const parsedPage = Number(page);
  const parsedLimit = Number(limit);

  if (isNaN(parsedPage) || parsedPage < 1) {
    return res.status(400).json({ error: 'Invalid page number' });
  }
  if (isNaN(parsedLimit) || parsedLimit < 1) {
    return res.status(400).json({ error: 'Invalid limit number' });
  }

  const offset = (parsedPage - 1) * parsedLimit;

  try {
    const foundHotels = await Hotel.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: parsedLimit,
      offset,
      raw: true,
    });

    const totalHotels = await Hotel.count();

    res.status(200).send({
      data: foundHotels,
      total: totalHotels,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getHotelById = async (req, res, next) => {
  try {
    const { hotelId } = req.params;

    const foundHotel = await Hotel.findByPk(hotelId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      raw: true,
    });

    if (!foundHotel) {
      return next(createHttpError(404, 'Hotel Not Found'));
    }

    res.status(200).send({ data: foundHotel });
  } catch (error) {
    next(error);
  }
};

module.exports.updateHotelById = async (req, res, next) => {
  const {
    body,
    params: { hotelId },
  } = req;

  try {
    const [, [updatedHotel]] = await Hotel.update(body, {
      where: { HT_ID: hotelId },
      raw: true,
      returning: true,
    });

    if (!updatedHotel) {
      return next(createHttpError(404, 'Hotel Not Found'));
    }

    const preparedHotel = _.omit(updatedHotel, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedHotel });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteHotelById = async (req, res, next) => {
  const {
    params: { hotelId },
  } = req;

  try {
    const deletedCount = await Hotel.destroy({
      where: { HT_ID: hotelId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Hotel Not Found'));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports.updateImage = async (req, res, next) => {
  const {
    file,
    params: { hotelId },
  } = req;

  try {
    if (!file) {
      return next(createHttpError(422, 'Image is Required'));
    }

    const hotel = await Hotel.findByPk(hotelId);
    if (!hotel) {
      return next(createHttpError(404, 'Hotel Not Found'));
    }

    const updatedHotel = await hotel.update({
      HT_Img: path
        .join(STATIC_IMAGES_FOLDER, file.filename)
        .replace(/\\/g, '/'),
    });

    const preparedHotel = updatedHotel.get();
    delete preparedHotel.createdAt;
    delete preparedHotel.updatedAt;

    res.status(200).send({ data: preparedHotel });
  } catch (error) {
    next(error);
  }
};
