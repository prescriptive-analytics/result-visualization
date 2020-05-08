import React, {useState} from "react";
import _ from "lodash";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import {VizualizationData} from "../util/DataModel";
import MetricsTable from "./MetricsTable";
import MetricMap from "./MetricMap";

import "mapbox-gl/dist/mapbox-gl.css";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        // display: 'flex',
        // flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      border: {
        border: `1px solid ${theme.palette.divider}`,
      },
      title: {
        padding: 50,
      },
      grid: {
        width: '100%',
        height: '100%',
      },
      subGrid: {
        height: '100%',
      },
      metricsGrid: {
        height: '100%',
        padding: theme.spacing(8, 1, 1, 1),
      },
      metrics: {
        width: '100%',
        height: '100%',
      },
    }),
);

const initialViewState = {
  longitude: 0.0,
  latitude: 0.0,
  bearing: 0,
  pitch: 40.5,
  zoom: 10,
};

type ModelViewProps = {
  data: VizualizationData;
}

export const ModelView: React.FC<ModelViewProps> = ({data}) => {
  const classes = useStyles();

  const [viewState, setViewState] = useState({
    ...initialViewState,
    longitude: _.meanBy(data.regions, 'lng'),
    latitude: _.meanBy(data.regions, 'lat'),
  });

  return (
      <Box className={classes.root}>
        <Grid container spacing={0} className={classes.grid}>
          {/* Metrics */}
          <Grid className={classes.subGrid} container spacing={0} item xs={6}>
            <Grid item xs={12} className={classes.metricsGrid}>
              {/* Metrics */}
              <MetricsTable className={classes.metrics} elevation={0} showHeader
                            simulationParams={data.params}/>
            </Grid>
          </Grid>
          {/* Maps */}
          <Grid className={classes.subGrid} container spacing={0} item xs={6}>
            <Grid item xs={12} className={classes.border}>
              <MetricMap viewState={viewState}
                         onViewStateChange={setViewState}
                         data={data.regions}
                         metricName="residentialPois"/>
            </Grid>
            <Grid item xs={12} className={classes.border}>
              <MetricMap viewState={viewState}
                         onViewStateChange={setViewState}
                         data={data.regions}
                         metricName="workingPois"/>
            </Grid>
            <Grid item xs={12} className={classes.border}>
              <MetricMap viewState={viewState}
                         onViewStateChange={setViewState}
                         showNav
                         data={data.regions}
                         metricName="commercialPois"/>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  )
}

export default ModelView;