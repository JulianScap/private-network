import Router from '@koa/router';
import bcrypt from 'bcrypt';

import { generateToken } from './generateToken.js';
import { Ok, badRequest } from '../common/response.js';
import Logger from '../common/Logger.js';
import DB from '../common/database.js';

const router = new Router({
  prefix: '/auth',
});

router.put('/', async (context) => {
  const { login, password } = context.request.body;
  Logger.info(`Creating account for ${login}`);

  const salt = await bcrypt.genSalt(12);
  const hash = await bcrypt.hash(password, salt);

  Logger.info(`Salt ${salt}`);
  Logger.info(`Hash ${hash}`);

  const me = {
    id: null,
    login,
    hash,
  };

  const session = DB.openSession();
  await session.store(me, 'me/1');
  await session.saveChanges();

  Logger.info(`Saved ${JSON.stringify(me)}`);
  Ok(context);
});

router.post('/', (context) => {
  const { login, password } = context.request.body;
  Logger.info(`Authenticating ${login}`);

  if (login === 'juju' && password === '1234') {
    Ok(context, {
      bearer: generateToken(login),
      user: {
        name: 'Julian',
      },
    });
  } else {
    badRequest(context, 'Authentication failed');
  }
});

export default router;
