import { validateToken } from '../auth/validateToken.js';
import Logger from '../common/Logger.js';
import { forbidden } from '../common/response.js';

export const authCheck = (ctx, next) => {
  Logger.info('Validating token');

  const { authorization } = ctx.request.header;

  if (authorization && validateToken(authorization.replace('Bearer ', ''))) {
    return next();
  }

  Logger.warn(`Authentication failed with header ${authorization}`);
  forbidden();
};
