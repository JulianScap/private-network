import Router from '@koa/router';

import DB from '../common/database.js';
import Logger from '../common/Logger.js';
import { badRequest, ok } from '../common/response.js';

import { authCheck } from '../middlewares/authCheck.js';
import { sanitizeResponse } from '../middlewares/sanitizeResponse.js';

const router = new Router({
  prefix: '/posts',
});

router.use(authCheck);
router.use(sanitizeResponse);

router.get('/', async (context) => {
  const session = DB.openSession();

  const posts = await session
    .query({ collection: 'posts' })
    .orderByDescending('@metadata.created')
    .take(10)
    .selectFields(['message', 'id'])
    .not()
    .whereExists('@metadata.deleted')
    .all();

  ok(context, posts);
});

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
      owner: context.request.headers.origin,
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

  if (!post) {
    badRequest('This post does not exist');
  }

  post['@metadata'].deleted = new Date();
  await session.saveChanges();

  ok(context);
});

export default router;
