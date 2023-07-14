import Logger from '../common/Logger.js';
import { internalServerError } from '../common/response.js';

export const errorHandler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    if (typeof err === 'object' && err.handle) {
      ctx.status = err.forbidden ? 401 : err.status;
      ctx.body = err.response;
      return;
    }

    Logger.error('Unhandled error');
    Logger.error(JSON.stringify(err, Object.getOwnPropertyNames(err), 2));
    internalServerError(ctx);
  }
};
