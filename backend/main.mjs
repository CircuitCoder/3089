import Koa from 'koa';
import routes from './routes';
import Static from 'koa-static';
import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';

import consts from './consts';
import { connect } from './db';

const app = new Koa();

app.use(routes.routes(), routes.allowedMethods());
app.use(Static(path.resolve(consts.BASEDIR, './frontend')))
app.use(async (ctx, next) => {
  if(ctx.method !== 'GET')
    return await next();
  // Serve fallback index
  ctx.body = await promisify(readFile)(path.resolve(consts.BASEDIR, './frontend/index.html'));
  ctx.type = 'text/html';
});

const PORT = parseInt(process.env.PORT || '5456', 10);

connect().then(() => {
  app.listen(PORT, () => {
    console.log(`Server up at 0.0.0.0:${PORT}`);
  });
});
