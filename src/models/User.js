/* eslint-disable no-useless-escape */
import mongoose from 'mongoose';
import bcrypt, { hashSync } from 'bcrypt';
import { CHAT, MESSAGE, RIDE, VERIFICATION } from '../constants';
const { Schema, Types } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
    },
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

    lastLng: Types.Decimal128,
    lastLat: Types.Decimal128,
    lastOrientation: Types.Decimal128,
    chat: {
      type: Schema.Types.ObjectId,
      ref: CHAT,
    },
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: MESSAGE,
      },
    ],
    fbId: {
      type: String,
    },
    verifications: [{ type: Schema.Types.ObjectId, ref: VERIFICATION }],
    ridesAsPassenger: [{ type: Schema.Types.ObjectId, ref: RIDE }],
    ridesAsDriver: [{ type: Schema.Types.ObjectId, ref: RIDE }],
  },
  { timestamps: true }
);
userSchema.virtual('fullName').get(function () {
  return this.firstName + ' ' + this.lastName;
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

const User = mongoose.model('User', userSchema);
export default User;
