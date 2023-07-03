import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';
import { readFileSync } from 'fs';

import config from '../config.js';

export const generateToken = (login) => {
  const privateKey = readFileSync('.keys/private-key.pem');

  const ticks = Date.now() / 1000;
  const oneHourInMinutes = 60 * 60;

  const data = {
    iss: config.domain, // issuer
    sub: login, // the user id
    name: login,
    aud: 'https://www.private-network.com', // who is the token for
    exp: Math.floor(ticks) + oneHourInMinutes, // expiry ticks
    iat: Math.floor(ticks), // issued at
    nbf: Math.floor(ticks), // not before
    jti: randomUUID(),
    data: { some: 'information' },
  };

  return jwt.sign(data, privateKey, {
    algorithm: 'RS512',
  });
};
