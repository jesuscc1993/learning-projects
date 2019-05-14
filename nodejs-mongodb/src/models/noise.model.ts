import { GeoJson } from './geoJson.model';

export class Noise {
  _id?: any;
  location: GeoJson;
  decibels: number;
  date: Date;
  deviceId?: string;
}

export class NoiseFilters {
  location?: GeoJson;
  fromDate?: Date;
  toDate?: Date;
}

export class DecibelsAverage {
  date: Date;
  decibels: number;
}

export function isNoise(object: any): boolean {
  return object && object.location && object.decibels;
}