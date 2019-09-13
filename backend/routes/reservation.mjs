import Router from '@circuitcoder/koa-router';

import Reservation from '../db/Reservation';

const router = new Router();

router.get('/', async ctx => {
  const now = new Date();
  const current = await Reservation.findOne({
    from: { $lte: now },
    to: { $gt: now },
    deleted: { $ne: true },
  }).populate('by', 'name').populate('participants', 'name');

  let nextUp = await Reservation.find({
    from: { $gt: now },
    deleted: { $ne: true },
  }).sort({ from: 1 }).limit(3).populate('by', 'name').populate('participants', 'name');

  return ctx.body = {
    current, nextUp,
  };
});

router.get('/:id', async ctx => {
  return ctx.body = await Reservation.findById(ctx.params.id).populate('by', 'name').populate('participants', 'name');
});

router.post('/', async ctx => {
  // if(!ctx.state.user) return ctx.status = 403;

  const { from, to, title } = ctx.request.body;

  if(from >= to) {
    ctx.body = { err: 'INVALID_TIME' };
    return ctx.status = 400;
  }

  const collided = await Reservation.findOne({
    from: { $lt: to },
    to: { $gt: from },
    deleted: { $ne: true },
  });

  if(collided) {
    ctx.body = { err: 'COLLISION' };
    return ctx.status = 400;
  }

  const reservation = await Reservation.create({
    from, to, title,
    by: null,
    participants: [],
  });

  return ctx.body = { _id: reservation._id };
});

router.delete('/:id', async ctx => {
  // if(!ctx.state.user) return ctx.status = 403;
  // const user = await User.findById(ctx.state.user._id);

  // if(!user.isAdmin) return ctx.status = 403;

  const found = await Reservation.findOneAndUpdate({
    _id: ctx.params.id,
  }, {
    $set: { deleted: true },
  });

  return ctx.status = found ? 204 : 403;
});

export default router;
