import { randomUUID } from 'node:crypto';
import Router from '@koa/router';

import DB from '../common/database.js';
import Logger from '../common/Logger.js';
import { badRequest, ok } from '../common/response.js';
import { authCheck } from '../middlewares/authCheck.js';
import { sanitizeResponse } from '../middlewares/sanitizeResponse.js';
import { generateToken } from '../common/generateToken.js';

const router = new Router({
  prefix: '/posts',
});

router.use(sanitizeResponse);

router.put('/', authCheck(), async (context) => {
  Logger.info(`Adding link ${context.link}`);
  const linkRequest = context.request.body;

  const tokenId = randomUUID();
  const token = generateToken(linkRequest.uri, linkRequest.uri, tokenId);

  

  const session = DB.openSession();

  await session.store({
    tokenId,
    token,
    url: linkRequest.uri,
  });

  await session.saveChanges();

  ok(context);
});

export default router;
