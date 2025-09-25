// src/app.js
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes/index.route.js';
import { notFoundHandler, errorHandler } from './middlewares/error.middleware.js';

const app = express();
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan('dev'));

app.use('/', routes);
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
