import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import Auth from './auth/auth.route.js';
import User from './user/user.route.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { logRequest } from './middlewares/logRequest.js';
import Logger from './common/Logger.js';

const app = new Koa();
const port = 51055;

app.use(bodyParser());
app.use(cors());

app.use(errorHandler);
app.use(logRequest);

app.use(Auth.routes(), Auth.allowedMethods());
app.use(User.routes(), User.allowedMethods());


app.listen(port);

Logger.info(`Listening on port ${port}`);
