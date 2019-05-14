# Express (node.js) + Mongoose (MongoDB) demo application

## About
This project exposes a series of endpoints procuring data management and analysis on noise registrations with auxiliary optional locations to be used as proxies for the noises' origin location.

## Technologies

The project uses [Express](https://expressjs.com/) to setup a [node.js](https://nodejs.org/) server and [Mongoose](https://mongoosejs.com/) to handle data management with [MongoDB](https://www.mongodb.com/).

Libraries such as [Lodash](https://lodash.com/) and [Moment.js](https://momentjs.com/) have been incorporated mostly to facilitate data iteration and dates handling respectively.

[TypeScript](https://www.typescriptlang.org/) has been used instead of plain JS in order to facilitate a more defined and structured code that can easily highlight errors in the source code rather than at runtime.

## Installation

### With docker

1. Install [node.js](https://nodejs.org/)
2. Install [Docker](https://www.docker.com)
3. Run the following commands:

```
npm i
docker pull mongo
```

### Without docker

1. Install [node.js](https://nodejs.org/)
2. Install [MongoDB](https://www.mongodb.com/)
3. Run the following command:

```
npm i
```

## Configuration

Edit file src/app.settings.ts with your custom settings:

- `listeningPort` Port node.js will listen at for connections.
- `loggingEnabled` Defines whether logs will be outputted to the terminal. Errors will always be outputted.
- `connectionSettings.url` Url to use for the MongoDB database connection.
- `connectionSettings.databaseName` Name of the database to be used.
- `maximumSearchDistance` Maximum distance to the provided filter coordinates for results to be included.

## Run

1. Start your MongoDB daemon
2. Run `npm start` on a terminal to start the server.

## Utility commands

- `npm run start-mongodb` runs a local MongoDB daemon (Unix-based OS only).
- `npm run start-docker-db` starts a MongoDB container with the default settings.
- `npm run stop-docker-db` stops any MongoDB container started with the default settings.

## Documentation

### Models

\* All fields marked with `?` are optional.

- [GeoJson](http://geojson.org/)

```
{
  type: string;
  coordinates: number[];
}
```

- Noise

```
{
  location: GeoJson;
  decibels: number;
  date?: Date;       // When sending as undefined with POST, defaults to the current date
  deviceId?: string;
}
```

- NoiseFilters

```
{
  location?: GeoJson;
  fromDate?: Date;
  toDate?: Date;
}
```

- DecibelsAverage

```
{
  date: Date;       // Ignores minutes and seconds as average is calculated per hour
  decibels: number;
}
```

- Place

```
{
  location: GeoJson;
  name: string;
}
```

- PlaceFilters

```
{
  location: GeoJson;
}
```

### Endpoints

`GET` `/noises/`

- Returns all existing noises.
- `response body` `Noise[]`

`POST` `/noises/`

- Inserts the noise provided as request body.
- `request body` `Noise`
- `response body` `Noise`

`POST` `/noises/filter/`

- Returns all existing noises matching the noise filters provided as request body.
- `request body` `NoiseFilters`
- `response body` `Noise[]`

`POST` `/noises/average/`

- Returns the decibels per hour average for all existing noises matching the noise filters provided as request body.
- `request body` `NoiseFilters`
- `response body` `DecibelsAverage[]`

`GET` `/places/`

- Returns all existing places.
- `response body` `Place[]`

`POST` `/places/`

- Inserts the place provided as request body.
- `request body` `Place`
- `response body` `Place[]`

`POST` `/places/places/`

- Returns all existing places matching the place filters provided as request body.
- `request body` `PlaceFilters`
- `response body` `Place[]`
