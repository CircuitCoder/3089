import mongoose from 'mongoose';

export async function connect() {
  await mongoose.connect('mongodb://localhost/3089');
}
