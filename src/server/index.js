import Koa from 'koa';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import Auth from './auth/auth.route.js';

const app = new Koa();
const port = 51055;

app.use(bodyParser());
app.use(cors());

app.use(Auth.routes(), Auth.allowedMethods());

app.listen(port);

console.log(`Listening on port ${port}`);
