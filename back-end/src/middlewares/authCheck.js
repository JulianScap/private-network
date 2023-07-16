import { validateToken } from '../auth/validateToken.js';
import Logger from '../common/Logger.js';
import Config from '../common/config.js';
import { forbidden } from '../common/response.js';

/**
 * Function to build a middleware.
 * @param {boolean} validateAudience Checks whether the owner of the website is using the current token
 * @returns A Promise
 * @throws If the token is missing or invalid
 */
export const authCheck = (validateAudience) => {
  return (ctx, next) => {
    Logger.info('Validating token');

    const { authorization } = ctx.request.header;
    const tokenString = authorization?.replace('Bearer ', '');

    const [valid, token] = validateToken(tokenString);
    if (valid && (!validateAudience || token.aud === Config.frontEnd)) {
      return next();
    }

    Logger.warn(`Authentication failed with header ${authorization}`);
    forbidden();
  };
};
