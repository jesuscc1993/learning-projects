import { Schema } from './node_modules/mongoose';

export const noiseSchema: Schema = new Schema({
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  decibels: Number,
  date: {
    type: Date,
    default: Date.now
  },
  deviceId: String
});
noiseSchema.index({
  location: '2dsphere'
});

export const placeSchema: Schema = new Schema({
  location: {
    type: {
      type: String
    },
    coordinates: [Number]
  },
  name: String
});
placeSchema.index({
  location: '2dsphere'
});
