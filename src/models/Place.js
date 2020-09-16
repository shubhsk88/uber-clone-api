import mongoose, { Schema, Types } from 'mongoose';

const placeSchema = new Schema({
  name: String,
  isFav: {
    type: Boolean,
    default: false,
  },
  lat: {
    type: Types.Decimal128,
    default: 0,
  },
  log: {
    type: Types.Decimal128,
    default: 0,
  },
  address: String,
  createdAt: String,
  updatedAt: String,
});

const Place = mongoose.model('Place', placeSchema);

export default Place;
