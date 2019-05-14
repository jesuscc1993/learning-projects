import { ConnectionSettings } from './services/data-access/data-access.service';

export class AppSettings {

  static listeningPort: number = 3000;

  static loggingEnabled: boolean = true;

  static connectionSettings: ConnectionSettings = {
    url: 'mongodb://localhost:27017',
    databaseName: 'express-demo'
  };

  static maximumSearchDistance: number = 1000; // meters

}