import mongoose, { Schema, Types } from 'mongoose';

let rideSchema = new Schema({
  pickUpAddress: String,
  pickupLat: { type: Types.Decimal128, default: 0 },
  pickupLng: { type: Types.Decimal128, default: 0 },
  dropOffAddress: String,
  dropOffLat: { type: Types.Decimal128, default: 0 },
  dropOffLng: { type: Types.Decimal128, default: 0 },
  distance: String,
  status: {
    type: String,
    enum: ['ACCEPTED', 'CANCELED', 'ONROUTE', 'FINISHED', 'REQUESTING'],
  },
  duration: String,
  price: { type: Types.Decimal128, default: 0 },
  createdAt: String,
  updatedAt: String,
});
