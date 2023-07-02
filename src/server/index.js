import Koa from 'koa';

const app = new Koa();
const port = 51055;

app.use((ctx) => {
  ctx.body = 'Hello Koa!';
});

app.listen(port);

console.log(`Listening on port ${port}`);
