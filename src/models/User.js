/* eslint-disable no-useless-escape */
import mongoose from 'mongoose';
import bcrypt, { hashSync } from 'bcrypt';
import { CHAT, MESSAGE, RIDE } from '../constants';
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    email: {
      type: String,
      unique: true,
    },
    verifiedEmail: {
      type: Boolean,
      default: false,
    },
    lastName: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
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

    lastLng: Schema.Types.Decimal128,
    lastLat: Schema.Types.Decimal128,
    lastOrientation: Schema.Types.Decimal128,
    chat: {
      type: Schema.Types.ObjectId,
      ref: CHAT,
    },
    places: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Place',
      },
    ],
    messages: [
      {
        type: Schema.Types.ObjectId,
        ref: MESSAGE,
      },
    ],
    fbId: {
      type: String,
    },

    ridesAsPassenger: [{ type: Schema.Types.ObjectId, ref: RIDE }],
    ridesAsDriver: [{ type: Schema.Types.ObjectId, ref: RIDE }],
  },
  {
    toJSON: {
      virtuals: true,
    },
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

userSchema.methods.comparePassword = function (plainText) {
  return bcrypt.compareSync(plainText, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
