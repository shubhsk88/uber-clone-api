import mongoose, { Schema } from 'mongoose';

const placeSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    isFav: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Number,
      default: 0,
    },
    log: {
      type: Number,
      default: 0,
    },
    userPrimary: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    address: String,
  },
  { timestamps: true }
);

const Place = mongoose.model('Place', placeSchema);

export default Place;
