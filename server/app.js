const express = require('express');
const cors = require('cors');
const { errorHandlers } = require('./middleware');
const router = require('./routes');
const CONSTANTS = require('./constants');

const app = express();

app.use(cors(CONSTANTS.corsOptions));

app.use(express.static(CONSTANTS.STATIC_PATH));

app.use(express.json());

app.use('/api', router);

app.use(errorHandlers.dbErrorHandler, errorHandlers.errorHandler);

module.exports = app;
