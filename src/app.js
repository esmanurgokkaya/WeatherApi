// src/app.js
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const routes = require('./routes');
const { notFoundHandler, errorHandler } = require('./middlewares/error.middleware');

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/api', routes);
app.use(notFoundHandler);
app.use(errorHandler);

module.exports = app;
