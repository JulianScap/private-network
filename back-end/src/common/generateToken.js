import { randomUUID } from 'node:crypto';
import jwt from 'jsonwebtoken';

import Config from './Config.js';
import { privateKey } from './security.js';

export const generateToken = (login, audience, tokenId) => {
  const ticks = Date.now() / 1000;
  const oneYearInMinutes = 60 * 60 * 24 * 365;

  const data = {
    iss: Config.backEndUri, // issuer
    sub: login, // the user id
    name: login,
    aud: audience || Config.frontEndUri, // who is the token for
    exp: Math.floor(ticks) + oneYearInMinutes, // expiry ticks
    iat: Math.floor(ticks), // issued at
    nbf: Math.floor(ticks), // not before
    jti: tokenId || randomUUID(),
    data: { some: 'information' },
  };

  return jwt.sign(data, privateKey, {
    algorithm: 'RS512',
  });
};
