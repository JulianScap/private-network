import jwt from 'jsonwebtoken';

import { publicKey } from '../common/security.js';
import Logger from '../common/Logger.js';

export const validateToken = (token) => {
  try {
    const jwtObject = jwt.verify(token, publicKey, {
      algorithm: 'RS512',
    });

    return [true, jwtObject];
  } catch (error) {
    const errorString = JSON.stringify(error, Object.getOwnPropertyNames(error), 2);
    Logger.error(`Token validation error ${errorString}`);

    return [false, null];
  }
};
