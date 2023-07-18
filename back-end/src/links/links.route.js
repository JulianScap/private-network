import { randomUUID } from 'node:crypto';
import Router from '@koa/router';
import jwt from 'jsonwebtoken';

import DB from '../common/database.js';
import Logger from '../common/Logger.js';
import { ok } from '../common/response.js';
import { authCheck } from '../middlewares/authCheck.js';
import { sanitizeResponse } from '../middlewares/sanitizeResponse.js';
import { generateToken } from '../common/generateToken.js';

const router = new Router({
  prefix: '/links',
});

router.use(sanitizeResponse);

async function saveLink(tokenId, token, uri) {
  const session = DB.openSession();

  await session.store({
    tokenId,
    token,
    uri,
    '@metadata': {
      '@collection': 'links',
    },
  });

  await session.saveChanges();
}

async function getBeUri(feUri) {
  const fetchUri = new URL('backend_uri', feUri).href;
  Logger.info(`Fetching at ${fetchUri}`);

  const response = await fetch(fetchUri);
  const { uri: beUrl } = await response.json();
  return beUrl;
}

async function shareToken(token, feUri) {
  const beUri = await getBeUri(feUri);

  await fetch(new URL('links/new', beUri).href, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  });
}

router.put('/', authCheck(), async (context) => {
  const linkRequest = context.request.body;
  Logger.info(`Adding link ${linkRequest.uri}`);

  const tokenId = randomUUID();
  const token = generateToken(linkRequest.uri, linkRequest.uri, tokenId);

  await saveLink(tokenId, token, linkRequest.uri);

  await shareToken(token, linkRequest.uri);

  ok(context);
});

router.put('/new', async (context) => {
  const { authorization } = context.request.headers;
  const token = authorization.replace('Bearer ', '');
  Logger.info(`Adding link ${token}`);
  const decoded = jwt.decode(token, {
    algorithm: 'RS512',
  });

  Logger.info(`Verifying with ${JSON.stringify(decoded.iss)}`);

  const pkResponse = await fetch(new URL('auth/pk', decoded.iss).href).then((x) => x.json());
  const { key } = pkResponse.body;
  Logger.info(`public key ${key}`);

  ok(context);
});

export default router;
