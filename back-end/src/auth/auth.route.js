import Router from '@koa/router';
import bcrypt from 'bcrypt';

import { generateToken } from './generateToken.js';
import { ok, badRequest, conflict } from '../common/response.js';
import Logger from '../common/Logger.js';
import DB from '../common/database.js';

const router = new Router({
  prefix: '/auth',
});

router.put('/', async (context) => {
  const { login, password } = context.request.body;
  Logger.info(`Creating account for ${login}`);
  const session = DB.openSession();

  const existingMe = await session.load('me/1');
  if (existingMe) {
    conflict(context);
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  Logger.info(`Hash ${hash}`);

  const me = {
    id: 1,
    login,
    hash,
    '@metadata': {
      '@collection': 'me',
    },
  };

  await session.store(me, 'me/1');
  await session.saveChanges();

  Logger.info(`Saved ${JSON.stringify(me)}`);
  ok(context);
});

router.post('/', async (context) => {
  const { login, password } = context.request.body;
  Logger.info(`Authenticating ${login}`);

  const session = DB.openSession();

  const existingMe = await session.load('me/1');
  const match = await bcrypt.compare(password, existingMe.hash);

  if (match) {
    ok(context, {
      bearer: generateToken(login),
      user: {
        name: existingMe.login,
      },
    });
    return;
  }

  badRequest(context, 'Authentication failed');
});

export default router;
