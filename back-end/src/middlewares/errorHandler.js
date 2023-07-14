import logger from '../common/Logger.js';
import { internalServerError } from '../common/response.js';

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    logger.error(JSON.stringify(err));
    internalServerError(ctx, err, 'Error caught');
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
