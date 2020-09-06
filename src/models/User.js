import mongoose from 'mongoose';

const { Schema, Types } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    unique: true,
    required: 'Email address is required',
    validate: [validateEmail, 'Please fill a valid email address'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please fill a valid email address',
    ],
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    lastName: String,
    firstName: String,
    age: Number,
    password: String,
    phoneNumber: String,
    verifiedPhoneNumber: {
      type: Boolean,
      default: false,
    },
    profilePhoto: String,
    isDriving: {
      type: Boolean,
      default: false,
    },
    isRiding: {
      type: Boolean,
      default: false,
    },
    isTaken: {
      type: Boolean,
      default: false,
    },
    createdAt: Date,
    updatedAt: Date,
    lastLng: Types.Decimal128,
    lastLat: Types.Decimal128,
    lastOrientation: Types.Decimal128,
  },
});
userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

const User = mongoose.model('User', userSchema);
export default User;
