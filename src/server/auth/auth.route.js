import Router from '@koa/router';
import jwt from 'jsonwebtoken';
import { readFileSync } from 'fs';
import { randomUUID } from 'crypto';

import config from '../config.js';

const router = new Router({
  prefix: '/auth'
});

router.post('/', (context) => {
  console.log('yeah');
  const { login, password } = context.request.body;

  if (login === 'juju' && password === '1234') {
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
      data: { some: 'information' }
    };

    const token = jwt.sign(data, privateKey, {
      algorithm: 'RS512'
    });

    context.body = { bearer: token };
  }
});

export default router;
