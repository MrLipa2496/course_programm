const createHttpError = require('http-errors');
const { Client } = require('../models');
const _ = require('lodash');

module.exports.createClient = async (req, res, next) => {
  const clientData = req.body;

  try {
    const requiredFields = [
      'CL_FirstName',
      'CL_LastName',
      'CL_DateOfBirth',
      'CL_Phone',
      'CL_Email',
    ];
    console.log('Request body:', clientData);

    for (const field of requiredFields) {
      if (!clientData[field]) {
        return next(createHttpError(400, `Missing required field: ${field}`));
      }
    }

    // Створюємо нового клієнта
    const createdClient = await Client.create(clientData);
    const preparedClient = _.omit(createdClient.get(), [
      'createdAt',
      'updatedAt',
    ]);
    console.log('Prepared client:', preparedClient); // Логування підготовленого клієнта

    res.status(201).send({ data: preparedClient });
  } catch (error) {
    next(error);
  }
};

module.exports.getClient = async (req, res, next) => {
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
    const foundClient = await Client.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      limit: parsedLimit,
      offset,
      raw: true,
    });

    const totalClient = await Client.count();

    res.status(200).send({
      data: foundClient,
      total: totalClient,
    });
  } catch (error) {
    next(error);
  }
};

module.exports.getClientById = async (req, res, next) => {
  const { clientId } = req.params;

  try {
    const foundClient = await Client.findByPk(clientId, {
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      raw: true,
    });

    if (!foundClient) {
      return next(createHttpError(404, 'Client Not Found'));
    }

    res.status(200).send({ data: foundClient });
  } catch (error) {
    next(error);
  }
};

module.exports.updateClientById = async (req, res, next) => {
  const { body } = req;
  const { clientId } = req.params;

  try {
    const [, [updatedClient]] = await Client.update(body, {
      where: { CL_ID: clientId },
      returning: true,
    });

    if (!updatedClient) {
      return next(createHttpError(404, 'Client Not Found'));
    }

    const preparedClient = _.omit(updatedClient, ['createdAt', 'updatedAt']);

    res.status(200).send({ data: preparedClient });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteClientById = async (req, res, next) => {
  const { clientId } = req.params;

  try {
    const deletedCount = await Client.destroy({
      where: { CL_ID: clientId },
    });

    if (deletedCount === 0) {
      return next(createHttpError(404, 'Client Not Found'));
    }

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
