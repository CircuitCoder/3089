import Router from '@circuitcoder/koa-router';

const router = new Router();

router.get('/callback', ctx => {
  return ctx.body = { hi: true };
});

export default router;
