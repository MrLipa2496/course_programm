const path = require('node:path');
const createHttpError = require('http-errors');
const _ = require('lodash');
const { STATIC_IMAGES_FOLDER } = require('../constants');
const { Tour } = require('../models');

module.exports.createTour = async (req, res, next) => {
  const { body, file } = req;

  if (file) {
    body.TR_Img = path
      .join(STATIC_IMAGES_FOLDER, file.filename)
      .replace(/\\/g, '/');
  }

  if (body.TR_Price) {
    const price = parseFloat(body.TR_Price);
    if (isNaN(price)) {
      return res.status(400).send({ error: 'TR_Price must be a valid number' });
    }
    body.TR_Price = price;
  }

  try {
    const createdTour = await Tour.create(body);

    const preparedTour = _.omit(createdTour.get(), ['createdAt', 'updatedAt']);

    res.status(201).send({ data: preparedTour });
  } catch (err) {
    next(err);
  }
};

module.exports.getTours = async (req, res, next) => {
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
    const foundTours = await Tour.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: parsedLimit,
      offset,
      order: [['TR_Price', 'DESC']],
      raw: true,
    });

    const totalTours = await Tour.count();

    res.status(200).send({
      data: foundTours,
      total: totalTours,
    });
  } catch (err) {
    next(err);
  }
};
module.exports.getTourById = async (req, res, next) => {
  try {
    const { tourId } = req.params;

    const foundTour = await Tour.findByPk(tourId, {
      attributes: {
        exclude: ['createdAt', 'updatedAt'],
      },
      raw: true,
    });

    if (!foundTour) {
      return next(createHttpError(404, 'Tour Not Found'));
    }

    res.status(200).send({ data: foundTour });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTourById = async (req, res, next) => {
  const {
    body,
    params: { tourId },
  } = req;

  try {
    const [, [updatedTour]] = await Tour.update(body, {
      where: { TR_ID: tourId },
      raw: true,
      returning: true,
    });

    if (!updatedTour) {
      return next(createHttpError(404, 'Tour Not Found'));
    }

    const preparedTour = _.omit(updatedTour, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedTour });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTourById = async (req, res, next) => {
  const {
    params: { tourId },
  } = req;

  try {
    const deletedCount = await Tour.destroy({
      where: { TR_ID: tourId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Tour Not Found'));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

module.exports.updateImage = async (req, res, next) => {
  const {
    body,
    file,
    params: { tourId },
  } = req;

  try {
    if (!file) {
      return next(createHttpError(422, 'Image is Required'));
    }

    const tour = await Tour.findByPk(tourId);
    if (!tour) {
      return next(createHttpError(404, 'Tour Not Found'));
    }

    if (file) {
      body.TR_Img = path
        .join(STATIC_IMAGES_FOLDER, file.filename)
        .replace(/\\/g, '/');
    }

    const updatedTour = await tour.update({
      TR_Img: path.join(STATIC_IMAGES_FOLDER, file.filename),
    });

    const preparedTour = _.omit(updatedTour.get(), [
      'passwHash',
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedTour });
  } catch (error) {
    next(error);
  }
};
