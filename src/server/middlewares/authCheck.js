import { validateToken } from '../auth/validateToken.js';

export const authCheck = (ctx, next) => {
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
