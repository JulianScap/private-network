import Router from '@koa/router';

import { Ok } from '../common/response.js';
import Logger from '../common/Logger.js';
import { authCheck } from '../middlewares/authCheck.js';

const router = new Router({
  prefix: '/user',
});

router.use(authCheck);

router.get('/', (context) => {
  Logger.info('Fetching user data');
  Ok(context, {
    user: {
      name: 'Julian',
    },
  });
});

export default router;
