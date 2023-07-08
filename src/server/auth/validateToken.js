import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

import Logger from '../common/Logger.js';

const publicKey = readFileSync('.keys/public-key.pem');

export const validateToken = (token) => {
  try {
    const decoded = jwt.verify(token.replace('Bearer ', ''), publicKey, {
      algorithm: 'RS512',
    });
    return !!decoded;
  } catch (error) {
    Logger.warn(`Authentication failed with token ${token}`);
  }
};
