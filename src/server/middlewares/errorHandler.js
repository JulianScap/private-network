import { internalServerError } from '../common/response.js';

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    //logger.error(err);
    console.log(err);
    internalServerError(ctx, err, 'Error caught');
    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      message: err.message,
    };
  }
};
