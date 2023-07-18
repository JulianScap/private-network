import { randomUUID } from 'node:crypto';
import Router from '@koa/router';
import jwt from 'jsonwebtoken';

import DB from '../common/database.js';
import Logger from '../common/Logger.js';
import { badRequest, ok } from '../common/response.js';
import { authCheck } from '../middlewares/authCheck.js';
import { sanitizeResponse } from '../middlewares/sanitizeResponse.js';
import { generateToken } from '../common/generateToken.js';

const router = new Router({
  prefix: '/links',
});

router.use(sanitizeResponse);

async function saveLink(tokenId, token, uri, status) {
  Logger.info(`Saving link for ${uri}`);
  const session = DB.openSession();

  await session.store({
    tokenId,
    token,
    uri,
    status,
    '@metadata': {
      '@collection': 'links',
    },
  });

  await session.saveChanges();
}

async function getBeUri(feUri) {
  const fetchUri = new URL('backend_uri', feUri).href;
  Logger.info(`Fetching brUri at ${fetchUri}`);

  const response = await fetch(fetchUri);
  const { uri: beUrl } = await response.json();
  return beUrl;
}

async function shareToken(token, feUri) {
  const beUri = await getBeUri(feUri);

  const linkUri = new URL('links/new', beUri).href;
  Logger.info(`Sending request to ${linkUri}`);

  await fetch(linkUri, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: 'PUT',
  });
}

router.get('/status/:status', authCheck(true), async (context) => {
  const { status } = context.params;
  Logger.info(`Getting links by status ${status}`);
  const session = DB.openSession();

  const links = await session
    .query({ collection: 'links' })
    .selectFields(['uri', 'status', 'id'])
    .whereEquals('status', status)
    .not()
    .whereExists('@metadata.deleted')
    .take(10)
    .orderByDescending('@metadata.created')
    .all();

  ok(context, links);
});

router.put('/', authCheck(true), async (context) => {
  const linkRequest = context.request.body;
  Logger.info(`Adding link ${linkRequest.uri}`);

  const tokenId = randomUUID();
  const token = generateToken(linkRequest.uri, linkRequest.uri, tokenId);

  await saveLink(tokenId, null, linkRequest.uri, 'InviteSent');

  await shareToken(token, linkRequest.uri);

  ok(context);
});

router.put('/new', async (context) => {
  const { authorization } = context.request.headers;
  const token = authorization.replace('Bearer ', '');
  Logger.info('Creating link request');
  const decoded = jwt.decode(token, {
    algorithm: 'RS512',
  });

  Logger.info(`Verifying with ${JSON.stringify(decoded.iss)}`);

  const pkResponse = await fetch(new URL('auth/pk', decoded.iss).href).then((x) => x.json());
  const { key } = pkResponse.body;
  Logger.info('Public key fetched');
  try {
    jwt.verify(token, key, {
      algorithm: 'RS512',
    });
  } catch {
    badRequest('The token verification failed');
  }
  Logger.info('The token is valid');

  await saveLink(null, token, decoded.iss, 'Invited');

  ok(context);
});

export default router;
