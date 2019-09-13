import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  title: String,

  from: Date,
  to: Date,

  deleted: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('Reservation', schema);
