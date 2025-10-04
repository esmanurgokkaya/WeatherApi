import { HttpError } from '../utils/http.errors.js';
import logger from '../utils/logger.js';
import AppError from '../utils/app.error.js';

function notFoundHandler(_req,_res, next) {
    next(new HttpError(404, 'Not Found'));
}

function errorHandler(err, _req, res, _next) {
  if (err instanceof HttpError) {
    logger.error(`HttpError ${err.status}: ${err.message}`);
    return res.status(err.status).json({ ok: false, error: err.message });
  }
  if (err instanceof AppError) {
    logger.error(`AppError ${err.statusCode}: ${err.message}`);
    return res.status(err.statusCode).json({ ok: false, error: err.message });
  }
  if (err.name === 'ZodError') {
    const msg = err.errors?.map(e => e.message).join(', ') || 'Validation error';
    logger.warn(`Validation: ${msg}`);
    return res.status(400).json({ ok: false, error: msg });
  }
  logger.error('Unexpected error:', err);
  return res.status(500).json({ ok: false, error: 'Internal Server Error' });
}

export { notFoundHandler, errorHandler };
