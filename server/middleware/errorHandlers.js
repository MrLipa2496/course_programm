const { ValidationError, BaseError } = require('sequelize');
module.exports.dbErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    const errors = err.errors.map(e => ({ status: 422, title: e.message }));
    return res.status(422).send(errors);
  }
  if (err instanceof BaseError) {
    return res.status(500).send([
      {
        status: 500,
        title: 'DataBase Error',
      },
    ]);
  }
  next(err);
};

module.exports.errorHandler = (err, req, res, next) => {
  if (res.headerSent) {
    return;
  }

  const status = err.status ?? 500;
  const message = err.message ?? 'Server Error';
  console.log(err);

  res.status(status).send({
    errors: [
      {
        status,
        detail: message,
      },
    ],
  });
};
