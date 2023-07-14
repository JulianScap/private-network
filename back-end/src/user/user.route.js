import Router from '@koa/router';

import { ok } from '../common/response.js';
import Logger from '../common/Logger.js';
import { authCheck } from '../middlewares/authCheck.js';

const router = new Router({
  prefix: '/user',
});

router.use(authCheck);

router.get('/', (context) => {
  Logger.info('Fetching user data');
  ok(context, {
    user: {
      name: 'Julian',
    },
  });
});

export default router;
