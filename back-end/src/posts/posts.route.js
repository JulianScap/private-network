import Router from '@koa/router';

import { badRequest, ok } from '../common/response.js';
import Logger from '../common/Logger.js';
import { authCheck } from '../middlewares/authCheck.js';
import DB from '../common/database.js';

const router = new Router({
  prefix: '/posts',
});

router.use(authCheck);

router.post('/', async (context) => {
  Logger.info('Saving post');
  const post = context.request.body;
  if (!post?.message) {
    badRequest();
  }

  const session = DB.openSession();
  await session.store({
    ...post,
    '@metadata': {
      '@collection': 'posts',
    },
  });

  await session.saveChanges();

  ok(context);
});

export default router;
