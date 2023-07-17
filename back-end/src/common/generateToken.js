import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

import config from './Config.js';
import { privateKey } from './security.js';

export const generateToken = (login, audience) => {
  const ticks = Date.now() / 1000;
  const oneHourInMinutes = 60 * 60 * 24 * 365;

  const data = {
    iss: config.backEndUri, // issuer
    sub: login, // the user id
    name: login,
    aud: audience || config.frontEndUri, // who is the token for
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
