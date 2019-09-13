import mongoose from 'mongoose';

import Reservation from './Reservation';
import User from './User';

export async function connect() {
  await mongoose.connect('mongodb://localhost/3089');
}
