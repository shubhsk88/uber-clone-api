import mongoose, { Schema } from 'mongoose';

let verificationSchema = new Schema({
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
  key: {
    type: String,
  },
  payload: String,
  target: {
    type: String,
    enum: ['PHONE', 'EMAIL'],
  },
  used: {
    type: Boolean,
    default: false,
  },
});

let Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
