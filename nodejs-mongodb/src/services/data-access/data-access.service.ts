import { AppSettings } from '../../app.settings';
import { GeoJson } from '../../models/geoJson.model';
import { DecibelsAverage, isNoise, Noise, NoiseFilters } from '../../models/noise.model';
import { isPlace, Place, PlaceFilters } from '../../models/place.model';
import { noiseSchema, placeSchema } from './data-access.schemas';
import * as _ from './node_modules/lodash';
import { Document } from './node_modules/mongoose';
import { Observable } from './node_modules/rxjs';

const mongoose = require('mongoose');
const moment = require('moment');
let NoiseDocument: any;
let PlaceDocument: any;

export class DataAccessService {
  private errorMessages: any = {
    missingRequestBody: 'ERROR: Request body is missing.'
  };

  constructor() {
    this.setupSchemas();
  }

  public connect(connectionSettings: ConnectionSettings): Observable<any> {
    return new Observable(observer => {
      mongoose.connect(`${connectionSettings.url}/${connectionSettings.databaseName}`, { useNewUrlParser: true }).then(
        () => {
          observer.next();
          observer.complete();
        },
        (error: Error) => {
          observer.error(error);
        }
      );
    });
  }

  private setupSchemas() {
    NoiseDocument = mongoose.model('Noise', noiseSchema);
    PlaceDocument = mongoose.model('Place', placeSchema);
  }

  private saveDocument(document: Document): Observable<any> {
    return new Observable(observer => {
      document.save().then(
        (response: any) => {
          observer.next(response);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  private findDocuments(source: any, documentFilters: any, sortBy?: string): Observable<any> {
    return new Observable(observer => {
      source.find(documentFilters, (error: Error, documents: Document[]) => {
        if (error) {
          observer.error(error);
        } else {
          if (sortBy) {
            documents = _.sortBy(documents, sortBy);
          }
          observer.next(documents);
          observer.complete();
        }
      });
    });
  }

  private generateFilterFromGeoJson(geoJson: GeoJson): any {
    let filter: any;

    if (geoJson) {
      filter = {
        $near: {
          $geometry: geoJson,
          $maxDistance: AppSettings.maximumSearchDistance
        }
      };
    }

    return filter;
  }

  public insertNoise(noise: Noise): Observable<any> {
    if (isNoise(noise)) {
      let noiseDocument: Document = new NoiseDocument({
        location: noise.location,
        decibels: noise.decibels,
        date: noise.date,
        deviceId: noise.deviceId
      });

      return this.saveDocument(noiseDocument);
    } else {
      return new Observable(observer => {
        observer.error(this.errorMessages.missingRequestBody);
      });
    }
  }

  public getNoises(noiseFilters: NoiseFilters | undefined): Observable<Noise[]> {
    let documentFilters: any = {};

    if (noiseFilters) {
      if (noiseFilters.location) {
        documentFilters.location = this.generateFilterFromGeoJson(noiseFilters.location);
      }

      if (noiseFilters.fromDate) {
        documentFilters.date = documentFilters.date || {};
        documentFilters.date.$gt = noiseFilters.fromDate;
      }

      if (noiseFilters.toDate) {
        documentFilters.date = documentFilters.date || {};
        documentFilters.date.$lt = noiseFilters.toDate;
      }
    }

    return this.findDocuments(NoiseDocument, documentFilters, 'date');
  }

  public getNoisesDecibelsAverage(noiseFilters: NoiseFilters): Observable<DecibelsAverage[]> {
    return new Observable(observer => {
      this.getNoises(noiseFilters).subscribe(
        noises => {
          const groupedDecibels: any = {};

          noises.forEach(noise => {
            const dateString: string = moment
              .utc(noise.date)
              .startOf('hour')
              .toString();

            groupedDecibels[dateString] = groupedDecibels[dateString] || [];
            groupedDecibels[dateString].push(noise.decibels);
          });

          const decibelsAverages: DecibelsAverage[] = [];

          const dateStrings: string[] = Object.keys(groupedDecibels);
          dateStrings.forEach(dateString => {
            const decibelsByDate: any = groupedDecibels[dateString];

            decibelsAverages.push({
              date: new Date(dateString),
              decibels: _.sum(decibelsByDate) / decibelsByDate.length
            });
          });

          observer.next(decibelsAverages);
          observer.complete();
        },
        error => {
          observer.error(error);
        }
      );
    });
  }

  public insertPlace(place: Place): Observable<any> {
    if (isPlace(place)) {
      let placeDocument: Document = new PlaceDocument({
        location: place.location,
        name: place.name
      });

      return this.saveDocument(placeDocument);
    } else {
      return new Observable(observer => {
        observer.error(this.errorMessages.missingRequestBody);
      });
    }
  }

  public getPlaces(placeFilters: PlaceFilters | undefined): Observable<Place[]> {
    let documentFilters: any = {};

    if (placeFilters) {
      if (placeFilters.location) {
        documentFilters.location = this.generateFilterFromGeoJson(placeFilters.location);
      }
    }

    return this.findDocuments(PlaceDocument, documentFilters);
  }
}

export class ConnectionSettings {
  url: string;
  databaseName: string;
}
