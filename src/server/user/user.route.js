import Router from '@koa/router';

import { Ok } from '../common/response.js';

const router = new Router({
  prefix: '/user',
});

router.get('/', (context) => {
  Ok(context, {
    user: {
      name: 'Julian',
    },
  });
});

export default router;
