import Router from '@koa/router';

import { generateToken } from './generateToken.js';
import { Ok, badRequest } from '../common/response.js';

const router = new Router({
  prefix: '/auth',
});

router.post('/', (context) => {
  const { login, password } = context.request.body;

  if (login === 'juju' && password === '1234') {
    Ok(context, { bearer: generateToken(login) });
  } else {
    badRequest(context, 'Authentication failed');
  }
});

export default router;
