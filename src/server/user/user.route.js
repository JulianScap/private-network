import Router from '@koa/router';

import { Ok } from '../common/response.js';
import Logger from '../common/Logger.js';

const router = new Router({
  prefix: '/user',
});

router.get('/', (context) => {
  Logger.info('Fetching user data');
  Ok(context, {
    user: {
      name: 'Julian',
    },
  });
});

export default router;
