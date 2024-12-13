const createHttpError = require('http-errors');
const _ = require('lodash');
const { Transportation } = require('../models');

module.exports.getTransportations = async (req, res, next) => {
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
    const foundTransportations = await Transportation.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: parsedLimit,
      offset,
      order: [['TRP_Cost', 'DESC']],
      raw: true,
    });

    const totalTransportations = await Transportation.count();

    res.status(200).send({
      data: foundTransportations,
      total: totalTransportations,
    });
  } catch (err) {
    next(err);
  }
};

module.exports.getTransportationById = async (req, res, next) => {
  try {
    const { transportationId } = req.params;

    const foundTransportation = await Transportation.findByPk(
      transportationId,
      {
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        raw: true,
      }
    );

    if (!foundTransportation) {
      return next(createHttpError(404, 'Transportation Not Found'));
    }

    res.status(200).send({ data: foundTransportation });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTransportationById = async (req, res, next) => {
  const {
    body,
    params: { transportationId },
  } = req;

  try {
    const [, [updatedTransportation]] = await Transportation.update(body, {
      where: { TRP_ID: transportationId },
      raw: true,
      returning: true,
    });

    if (!updatedTransportation) {
      return next(createHttpError(404, 'Transportation Not Found'));
    }

    const preparedTransportation = _.omit(updatedTransportation, [
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedTransportation });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTransportationById = async (req, res, next) => {
  const {
    params: { transportationId },
  } = req;

  try {
    const deletedCount = await Transportation.destroy({
      where: { TRP_ID: transportationId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Transportation Not Found'));
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
    params: { transportationId },
  } = req;

  try {
    if (!file) {
      return next(createHttpError(422, 'Image is Required'));
    }

    const transportation = await Transportation.findByPk(transportationId);
    if (!transportation) {
      return next(createHttpError(404, 'Transportation Not Found'));
    }

    if (file) {
      body.TRP_Img = path
        .join(STATIC_IMAGES_FOLDER, file.filename)
        .replace(/\\/g, '/');
    }

    const updatedTransportation = await transportation.update({
      TRP_Img: body.TRP_Img,
    });

    const preparedTransportation = _.omit(updatedTransportation.get(), [
      'createdAt',
      'updatedAt',
    ]);

    res.status(200).send({ data: preparedTransportation });
  } catch (error) {
    next(error);
  }
};
