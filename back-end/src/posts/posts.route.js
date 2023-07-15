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
    message: post.message,

    '@metadata': {
      '@collection': 'posts',
      created: new Date(),
      owner: 'http://xx.com'
    },
  });

  await session.saveChanges();

  ok(context);
});

router.delete('/', async (context) => {
  const { postId } = context.query;

  Logger.info(`Deleting post ${postId}`);

  if (!postId) {
    badRequest('Not a guid');
  }

  const session = DB.openSession();
  const post = await session.load(postId);
  post['@metadata'].deleted = new Date();
  await session.saveChanges();

  ok(context);
});

export default router;
