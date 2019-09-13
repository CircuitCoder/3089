import mongoose from 'mongoose';

const schema = new mongoose.Schema({
  stunum: String,
  name: String,

  moderator: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model('User', schema);
