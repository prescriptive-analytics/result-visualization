# KDD Competition COVID-19 Visualizer

This is a web app to let you visualize your KDD COVID-19 competition results.

## Usage

The app comes with sample data located under the `public/` folder. To visualize your simulation results place your simulation results folders along side the samples provided and use the `Load` button in the main screen to load the `simulation_config.json` file.

To see the base map, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens) you can obtain by creating a [Mapbox](http://www.mapbox.com) account. Set your Mapbox access token in `.env`:

```shell
REACT_APP_MAPBOX_TOKEN='<mapbox_access_token>'
```

Or set `REACT_APP_MAPBOX_TOKEN` directly in `MetricMap.tsx`. Other options can be found at [using with Mapbox GL](https://github.com/visgl/deck.gl/blob/8.1-release/docs/get-started/using-with-mapbox-gl.md).

To get started [install node.js](https://nodejs.org/) and execute the following:

```shell
# install dependencies
npm install
# or
yarn
# bundle and serve the app with webpack
npm start
```

## Simulation results data

Simulation results are stored in a [JSON configuration file](https://hzw77-demo.readthedocs.io/en/latest/try.html#sample-config-file) with pointers to related data files that are produced by the simulation software. For example `public/sample1.json` contains the following:

``` json
{
  "params": {
    "numIndividuals": 10001,
    "numDays": 21
  },
  "regionsFile": "sample1_regions.csv",
  "dailyStatsFile": "sample1_daily_stats.csv",
  "regionStatsFile": "sample1_region_stats.csv"
}
```

----
EVERYTHING BELOW TO BE FINALIZED AND DOCUMENTED IN THE SIM REPO

#### region_stats.csv

Region-level replay data file

| #  | Column Name    | Data Type | Description                      |
|----|----------------|-----------|----------------------------------|
| 0  | day            | int       | Current day in simulation        |
| 1  | poi_id         | int       | POI id                           |
| 2  | lat            | double    | latitude                         |
| 3  | lng            | double    | langitude                        |
| 4  | allsusceptible | int       | # of susceptible cases           |
| 5  | allincubation  | int       | # of pre-symptomatic cases       |
| 6  | alldiscovered  | int       | # of discovered cases            |
| 7  | allcritical    | int       | # of critical cases              |
| 8  | allrecovered   | int       | # of recovered cases             |
| 9  | allinfect      | int       | # of infected cases              |
| 10 | free_num       | int       | # of people without intervention |
| 1  | hospitalizeNum     | int       | # of hospitalized people                                 |
| 2  | isolateNum         | int       | # of isolated people                                     |
| 3  | quarantineNum      | int       | # of quarantined people                                  |
| 4  | confineNum         | int       | # of confined people                                     |
| 5  | free               | int       | # of people without intervention                         |
| 6  | CurrentHealthy     | int       | # of people that are not infected                        |
| 7  | CurrentInfected    | int       | # of infected cases                                      |
| 8  | CurrentSusceptible | int       | # of susceptible people                                  |
| 9  | CurrentIncubation  | int       | # of pre-symptomatic cases                               |
| 10 | CurrentDiscovered  | int       | # of symptomatic cases                                   |
| 11 | CurrentCritical    | int       | # of critical cases                                      |
| 12 | CurrentRecovered   | int       | # of recovered cases                                     |
| 13 | AccDiscovered      | int       | Accumulated # of symptomatic cases                       |
| 14 | AccCritical        | int       | Accumulated # of critical cases                          |
| 15 | AccAcquaintance    | int       | Accumulated # of  infected through stranger contacts     |
| 16 | AccStranger        | int       | Accumulated # of  infected through acquaintance contacts |
| 17 | measurement        | int       | a measurement defined in the docs                        |

### daily_stats.csv

City-level replay data file.

| #  | Column Name        | Data Type | Description                                              |
|----|--------------------|-----------|----------------------------------------------------------|
| 0  | day                | int       | Current day in simulation                                |
| 1  | hospitalizeNum     | int       | # of hospitalized people                                 |
| 2  | isolateNum         | int       | # of isolated people                                     |
| 3  | quarantineNum      | int       | # of quarantined people                                  |
| 4  | confineNum         | int       | # of confined people                                     |
| 5  | free               | int       | # of people without intervention                         |
| 6  | CurrentHealthy     | int       | # of people that are not infected                        |
| 7  | CurrentInfected    | int       | # of infected cases                                      |
| 8  | CurrentSusceptible | int       | # of susceptible people                                  |
| 9  | CurrentIncubation  | int       | # of pre-symptomatic cases                               |
| 10 | CurrentDiscovered  | int       | # of symptomatic cases                                   |
| 11 | CurrentCritical    | int       | # of critical cases                                      |
| 12 | CurrentRecovered   | int       | # of recovered cases                                     |
| 13 | AccDiscovered      | int       | Accumulated # of symptomatic cases                       |
| 14 | AccCritical        | int       | Accumulated # of critical cases                          |
| 15 | AccAcquaintance    | int       | Accumulated # of  infected through stranger contacts     |
| 16 | AccStranger        | int       | Accumulated # of  infected through acquaintance contacts |
| 17 | measurement        | int       | a measurement defined in the docs                        |

### regions.csv

Region specifications file including POI counts.

| #  | Column Name        | Data Type | Description              |
| -- | ------------------ | --------- | ------------------------ |
| 1  | lat                | double    | region latitude          |
| 0  | lng                | double    | region longitude         |
| 2  | residentialPois    | int       | # of residential POIs    |
| 3  | workingPois        | int       | # of working POIs        |
| 4  | commercialPois     | int       | # of commercial POIs     |
