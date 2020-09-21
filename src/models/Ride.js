import mongoose, { Schema } from 'mongoose';
import { USER } from '../constants';

let rideSchema = new Schema({
  pickUpAddress: String,
  pickupLat: { type: Schema.Types.Decimal128, default: 0 },
  pickupLng: { type: Schema.Types.Decimal128, default: 0 },
  dropOffAddress: String,
  dropOffLat: { type: Schema.Types.Decimal128, default: 0 },
  dropOffLng: { type: Schema.Types.Decimal128, default: 0 },
  distance: String,
  status: {
    type: String,
    enum: ['ACCEPTED', 'CANCELED', 'ONROUTE', 'FINISHED', 'REQUESTING'],
  },
  duration: String,
  price: { type: Schema.Types.Decimal128, default: 0 },
  createdAt: String,
  updatedAt: String,
  passenger: { type: Schema.Types.ObjectId, ref: USER },
  driver: { type: Schema.Types.ObjectId, ref: USER },
});

const Ride = mongoose.model('Ride', rideSchema);
export default Ride;
