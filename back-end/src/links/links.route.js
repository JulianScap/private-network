import { randomUUID } from 'node:crypto';
import Router from '@koa/router';
import jwt from 'jsonwebtoken';

import DB from '../common/database.js';
import Logger from '../common/Logger.js';
import { badRequest, ok } from '../common/response.js';
import { generateToken } from '../common/generateToken.js';
import Config from '../common/Config.js';
import { authCheck } from '../middlewares/authCheck.js';
import { sanitizeResponse } from '../middlewares/sanitizeResponse.js';

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

async function verifyLinkToken(issuer, token) {
  const pkUrl = new URL('auth/pk', issuer).href;

  Logger.info(`Verifying with ${issuer} as ${pkUrl}`);

  const pkResponse = await fetch(pkUrl).then((x) => x.json());
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
}

router.get('/status/:status', authCheck(), async (context) => {
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

router.put('/', authCheck(), async (context) => {
  const linkRequest = context.request.body;
  Logger.info(`Adding link ${linkRequest.uri}`);

  const tokenId = randomUUID();
  const token = generateToken(linkRequest.uri, linkRequest.uri, tokenId);

  const beUri = await getBeUri(linkRequest.uri);
  const linkUri = new URL('links/new', beUri).href;
  Logger.info(`Sending request to ${linkUri}`);

  await fetch(linkUri, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ frontEnd: Config.frontEndUri }),
  });

  await saveLink(tokenId, null, { frontEnd: linkRequest.uri, backEnd: beUri }, 'InviteSent');

  ok(context);
});

router.put('/new', async (context) => {
  const { authorization } = context.request.headers;
  const { frontEnd } = context.request.body;
  const token = authorization.replace('Bearer ', '');
  Logger.info('Creating link request');
  const decoded = jwt.decode(token, {
    algorithm: 'RS512',
  });

  await verifyLinkToken(decoded.iss, token);

  await saveLink(null, token, { backEnd: decoded.iss, frontEnd }, 'Invited');

  ok(context);
});

router.post('/accept/:id', authCheck(), async (context) => {
  const { id } = context.params;

  const session = DB.openSession();
  const link = await session.load(id);

  const tokenId = randomUUID();
  const token = generateToken(link.uri.backEnd, link.uri.backEnd, tokenId);

  await fetch(new URL('links/accept', link.uri.backEnd), {
    method: 'POST',
    body: JSON.stringify({ token }),
    headers: {
      Authorization: `Bearer ${link.token}`,
      'Content-Type': 'application/json',
    },
  });

  link.status = 'Accepted';
  link.tokenId = tokenId;
  await session.saveChanges();

  ok(context);
});

router.post('/accept', authCheck(false), async (context) => {
  Logger.info(`Accepting a link, for token ${context.state.token.jti}`);

  const session = DB.openSession();
  const token = context.request.body.token;

  const tokenId = context.state.token.jti;
  const link = await session.query({ collection: 'links' }).whereEquals('tokenId', tokenId).first();

  await verifyLinkToken(link.uri.backEnd, token);

  link.status = 'Accepted';
  link.token = token;
  await session.saveChanges();

  ok(context);
});

export default router;
