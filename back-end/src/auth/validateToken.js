import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';

const publicKey = readFileSync('.keys/public-key.pem');

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
