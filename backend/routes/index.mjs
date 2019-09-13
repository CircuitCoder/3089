import Router from '@circuitcoder/koa-router';

import auth from './auth';
import reservation from './reservation';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/reservation', reservation.routes());

export default router;
