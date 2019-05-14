import { GeoJson } from './geoJson.model';

export class Place {
  location: GeoJson;
  name: string;
}

export class PlaceFilters {
  location?: GeoJson;
}

export function isPlace(object: any): boolean {
  return object && object.location && object.name;
}