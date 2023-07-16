import Router from '@koa/router';
import bcrypt from 'bcrypt';
import { setTimeout } from 'timers/promises';

import { generateToken } from '../common/generateToken.js';
import { ok, badRequest, conflict } from '../common/response.js';
import Logger from '../common/Logger.js';
import DB from '../common/database.js';
import { publicKeyString } from '../common/security.js';

const router = new Router({
  prefix: '/auth',
});

router.put('/', async (context) => {
  const { login, password } = context.request.body;
  Logger.info(`Creating account for ${login}`);
  const session = DB.openSession();

  const existingMe = await session.load('me/1');
  if (existingMe) {
    conflict();
    return;
  }

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  const me = {
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
  const authError = 'Authentication failed';
  const { login, password } = context.request.body;
  Logger.info(`Authenticating ${login}`);

  const session = DB.openSession();

  const existingMe = await session.load('me/1');

  const match = existingMe?.login === login && (await bcrypt.compare(password, existingMe.hash));

  if (!match) {
    await setTimeout(2000 + Math.random() * 1000);
    badRequest(authError);
  }

  ok(context, {
    bearer: generateToken(login),
    user: {
      name: existingMe.login,
    },
  });
});

router.get('/pk', (context) => {
  ok(context, { key: publicKeyString });
});

export default router;
