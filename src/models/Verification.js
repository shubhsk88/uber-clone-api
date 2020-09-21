import mongoose, { Schema } from 'mongoose';

const PHONE = 'PHONE',
  EMAIL = 'EMAIL';
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
    enum: [PHONE, EMAIL],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

verificationSchema.pre('save', function (next) {
  if(!this.isModified('payload')){
    return next();
  }
  if (this.target === PHONE) {
    this.key = Math.floor(Math.random() * 100000);
  } else if (this.target === EMAIL) {
    this.key = Math.random().toString(36).substr(2);
  }
  next();
});
let Verification = mongoose.model('Verification', verificationSchema);

export default Verification;
