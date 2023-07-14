import jwt from 'jsonwebtoken';

import { publicKey } from '../common/security.js';

export const validateToken = (token) => {
  try {
    jwt.verify(token, publicKey, {
      algorithm: 'RS512',
    });
    return true;
  } catch (error) {
    return false;
  }
};
