import Router from '@koa/router';

import { generateToken } from './generateToken.js';
import { Ok, badRequest } from '../common/response.js';
import logger from '../common/logger.js';

const router = new Router({
  prefix: '/auth',
});

router.post('/', (context) => {
  const { login, password } = context.request.body;

  logger.info(`Authenticating ${login}`);

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
