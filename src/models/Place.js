import mongoose, { Schema } from 'mongoose';

const placeSchema = new Schema(
  {
    name: String,
    isFav: {
      type: Boolean,
      default: false,
    },
    lat: {
      type: Schema.Types.Decimal128,
      default: 0,
    },
    log: {
      type: Schema.Types.Decimal128,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    address: String,
  },
  { timestamps: true }
);

const Place = mongoose.model('Place', placeSchema);

export default Place;
