import { validateToken } from '../auth/validateToken.js';
import Logger from '../common/Logger.js';

export const authCheck = (ctx, next) => {
  Logger.info('Validating token');

  const { authorization } = ctx.request.header;

  if (authorization && validateToken(authorization.replace('Bearer ', ''))) {
    return next();
  }

  Logger.warn(`Authentication failed with header ${authorization}`);
  ctx.throw(401);
};
