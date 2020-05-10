# Mobility Intervention of Epidemics Challenge Visualizer

This is a web app to let you visualize your Mobility Intervention of Epidemics Challenge results.

## Usage

To get started [install node.js](https://nodejs.org/) and install the dependencies:

```shell
npm install
# or
yarn
```

To see the base map, you need a [Mapbox access token](https://docs.mapbox.com/help/how-mapbox-works/access-tokens) that you can obtain by creating a [Mapbox](http://www.mapbox.com) account. Set your Mapbox access token in `.env`:

```shell
REACT_APP_MAPBOX_TOKEN='<mapbox_access_token>'
```

Or set `REACT_APP_MAPBOX_TOKEN` directly in `MetricMap.tsx`.

To start the app bundle and serve the app with webpack:

```shell
npm start
```

The app comes with a sample results data located under the `public/` folder. You can load the sample data using the `Load` button in the main screen and selecting the `public/sample1.json` file.

To visualize your own simulation results data, you must place the simulation results files in `public/`. Simulation results include [simulation logs](https://hzw77-demo.readthedocs.io/en/latest/try.html#results) referenced through a [JSON configuration file](https://hzw77-demo.readthedocs.io/en/latest/try.html#sample-config-file). For example `public/sample1.json` contains the following:

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
