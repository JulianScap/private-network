import { validateToken } from '../auth/validateToken.js';
import Logger from '../common/Logger.js';

export const authCheck = (ctx, next) => {
  Logger.info('Validating token');
  const { request } = ctx;
  const { header } = request;
  const { authorization } = header;
  if (authorization) {
    if (validateToken(authorization)) {
      return next();
    }
  }

  ctx.throw(401);
};
