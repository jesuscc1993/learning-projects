import { AppSettings } from './app.settings';
import { DecibelsAverage, Noise, NoiseFilters } from './models/noise.model';
import { Place, PlaceFilters } from './models/place.model';
import bodyParser = require('./node_modules/body-parser');
import { Express } from './node_modules/express';
import express = require('./node_modules/express');
import { Request, Response } from './node_modules/express-serve-static-core';
import { DataAccessService } from './services/data-access/data-access.service';
import { OutputUtil } from './utils/output.util';

export class App {
  private app: Express;
  private dataAccessService: DataAccessService;

  initialize(): void {
    OutputUtil.configure({ loggingEnabled: AppSettings.loggingEnabled });
    this.dataAccessService = new DataAccessService();

    this.setupApp();
    this.setupEndpoints();
    this.connectToDatabase();
  }

  setupApp(): void {
    this.app = express();
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());

    this.app.listen(AppSettings.listeningPort, () => {
      OutputUtil.log(`Express server listening on port ${AppSettings.listeningPort}`, true);
    });
  }

  setupEndpoints(): void {
    this.app.get('/', (request, response) => response.send(`Express server is up and running.`));

    this.app.get('/noises/', (request, response) => this.getNoises(request, response));
    this.app.post('/noises/', (request, response) => this.insertNoise(request, response));
    this.app.post('/noises/filter/', (request, response) => this.getNoises(request, response));
    this.app.post('/noises/average/', (request, response) => this.getNoisesDecibelsAverage(request, response));

    this.app.get('/places/', (request, response) => this.getPlaces(request, response));
    this.app.post('/places/', (request, response) => this.insertPlace(request, response));
    this.app.post('/places/filter/', (request, response) => this.getPlaces(request, response));
  }

  connectToDatabase(): void {
    this.dataAccessService.connect(AppSettings.connectionSettings).subscribe(
      () => {
        OutputUtil.log(`Database connection successfully established`);
      },
      (error: Error) => OutputUtil.error(error)
    );
  }

  /* operations */

  insertNoise(request: Request, response: Response): void {
    const noise: Noise = request.body;

    this.dataAccessService.insertNoise(noise).subscribe(
      (noiseDocument: Noise) => {
        const responseBody: string = `Successfully inserted noise: ${OutputUtil.toString(noiseDocument)}`;
        response.send(responseBody);
        OutputUtil.log(responseBody);
      },
      (error: Error) => this.onRequestError(response, error)
    );
  }

  getNoises(request: Request, response: Response): void {
    const noiseFilters: NoiseFilters = request.body;

    this.dataAccessService.getNoises(noiseFilters).subscribe(
      (noiseDocuments: Noise[]) => {
        const responseBody: string = `${OutputUtil.toString(noiseDocuments)}`;
        response.send(responseBody);
      },
      (error: Error) => this.onRequestError(response, error)
    );
  }

  getNoisesDecibelsAverage(request: Request, response: Response): void {
    const noiseFilters: NoiseFilters = request.body;

    this.dataAccessService.getNoisesDecibelsAverage(noiseFilters).subscribe(
      (noiseDocuments: DecibelsAverage[]) => {
        const responseBody: string = `${OutputUtil.toString(noiseDocuments)}`;
        response.send(responseBody);
      },
      (error: Error) => this.onRequestError(response, error)
    );
  }

  insertPlace(request: Request, response: Response): void {
    const place: Place = request.body;

    this.dataAccessService.insertPlace(place).subscribe(
      (placeDocument: Place) => {
        const responseBody: string = `Successfully inserted place: ${OutputUtil.toString(placeDocument)}`;
        response.send(responseBody);
        OutputUtil.log(responseBody);
      },
      (error: Error) => this.onRequestError(response, error)
    );
  }

  getPlaces(request: Request, response: Response): void {
    const placeFilters: PlaceFilters = request.body;

    this.dataAccessService.getPlaces(placeFilters).subscribe(
      (placeDocuments: Place[]) => {
        const responseBody: string = `${OutputUtil.toString(placeDocuments)}`;
        response.send(responseBody);
      },
      (error: Error) => this.onRequestError(response, error)
    );
  }

  private onRequestError(response: Response, error: Error): void {
    OutputUtil.error(error);
    response.send(error);
  }
}

new App().initialize();
