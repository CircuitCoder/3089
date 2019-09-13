import Koa from 'koa';
import routes from './routes';
import Static from 'koa-static';
import path from 'path';
import { readFile, exists } from 'fs';
import { promisify } from 'util';
import JWT from 'koa-jwt';
import CORS from '@koa/cors';

import consts from './consts';
import { SECRET } from './config'
import { connect } from './db';

async function buildApp() {
  const app = new Koa();

  app.use(CORS());
  app.use(JWT({ secret: SECRET, passthrough: true }));
  app.use(routes.routes(), routes.allowedMethods());

  const FRONTEND_ASSETS = path.resolve(consts.BASEDIR, './frontend');

  if(await promisify(exists)(FRONTEND_ASSETS)) {
    app.use(Static(path.resolve(consts.BASEDIR, './frontend/build')))
    app.use(async (ctx, next) => {
      if(ctx.method !== 'GET')
        return await next();
      // Serve fallback index
      ctx.body = await promisify(readFile)(path.resolve(consts.BASEDIR, './frontend/build/index.html'));
      ctx.type = 'text/html';
    });
  }

  return app;
}

const PORT = parseInt(process.env.PORT || '5456', 10);

connect().then(buildApp).then(app => {
  app.listen(PORT, () => {
    console.log(`Server up at 0.0.0.0:${PORT}`);
  });
});
