import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import Auth from './auth/auth.route.js';
import Links from './links/links.route.js';
import Posts from './posts/posts.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logRequest } from './middlewares/logRequest.js';
import Logger from './common/Logger.js';
import Config from './common/Config.js';

const app = new Koa();

app.use(bodyParser());
app.use(cors());

app.use(errorHandler);
app.use(logRequest);

app.use(Auth.routes(), Auth.allowedMethods());
app.use(Links.routes(), Links.allowedMethods());
app.use(Posts.routes(), Posts.allowedMethods());

app.listen({
  host: Config.host,
  port: Config.port,
});

Logger.info(`Listening on port ${Config.port}`);
