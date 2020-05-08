import React, {useEffect, useState} from "react";
import _ from "lodash";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import {VizualizationData} from "../util/DataModel";
import MetricsChart from "./MetricsChart";
import MetricMap from "./MetricMap";
import ReplayControl from "./ReplayControl";

import "mapbox-gl/dist/mapbox-gl.css";
import MapControl from "./MapControl";

const topHeight = 250;
const midHeight = 80;
const controlWidth = 250;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
      },
      topBox: {
        display: 'flex',
        width: '100%',
        height: topHeight,
        background: 'white',
      },
      midBox: {
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: midHeight,
        background: 'white',
      },
      bottomBox: {
        display: 'flex',
        height: `calc(100% - ${topHeight + midHeight}px)`,
      },
      chart: {
        width: '100%',
        padding: theme.spacing(0, 4, 0, 0),
      },
      mapGrid: {
        width: '100%',
        height: '100%',
      },
      border: {
        border: `1px solid ${theme.palette.divider}`,
      },
      replayControl: {
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: theme.spacing(0, 20, 0, 3),
      },
      mapControlOld: {
        margin: theme.spacing(1),
        width: controlWidth,
        position: "absolute",
        // zIndex: 9999,
        right: "15px",
        top: topHeight + midHeight + 75,
      },
      mapControlPanel: {
        width: controlWidth,
        position: "absolute",
        zIndex: 9999,
        right: "15px",
        top: midHeight/2 - 10,
      },
      mapControlPanelDetails: {
        padding: theme.spacing(0),
      },
      mapControl: {
        width: '100%'
      }
    }),
);

const initialViewState = {
  longitude: 0.0,
  latitude: 0.0,
  bearing: 0,
  pitch: 40.5,
  zoom: 10,
};

type MetricMap = {
  [key: string]: boolean;
};

const initialMetrics: MetricMap = {
  'free': true,
  // 'CurrentHealthy': true,
  // 'CurrentEffective': false,
  'CurrentSusceptible': false,
  'CurrentIncubation': false,
  'CurrentDiscovered': false,
  'CurrentCritical': false,
  'CurrentRecovered': false,
  'CurrentInfected': true,
};

const findSelectedMetrics = (metrics: MetricMap) => {
  return Object.entries(metrics).filter(([key, value]) => value)
      .map(([key, value]) => key);
}

type SimulationViewProps = {
  data: VizualizationData;
}

const SimulationView: React.FC<SimulationViewProps> = ({data}) => {
  const classes = useStyles();

  const [viewState, setViewState] = useState(initialViewState);
  const [step, setStep] = useState(1);
  const [metrics, setMetrics] = useState(initialMetrics);

  const [radius, setRadius] = useState(1000);
  const [coverage, setCoverage] = useState(0.9);
  const [lowerPercentile, setLowerPercentile] = useState(0);

  const computeMapSize: () => 12 | 6 | 4 | 3 | 2 = () => {
    switch (findSelectedMetrics(metrics).length) {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;
      case 5:
        return 4;
      default:
        return 4;
    }
  }

  useEffect(() => {
    setViewState({
      ...initialViewState,
      longitude: _.meanBy(data.regions, 'lng'),
      latitude: _.meanBy(data.regions, 'lat'),
    });
  }, [data]);

  return (
      <Box className={classes.root}>
        <Box className={classes.topBox}>
          {/* Chart */}
          <MetricsChart className={classes.chart} height={topHeight}
                        title={data.filename}
                        metrics={metrics} onMetricsChange={setMetrics}
                        step={step}
                        data={data.replay}/>
        </Box>
        <Divider/>
        <Box className={classes.midBox}>
          <ExpansionPanel className={classes.mapControlPanel} square variant="outlined">
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="map-controls-panel"
                id="map-controls-panel">
              <Typography>Map Controls</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.mapControlPanelDetails}>
              <MapControl className={classes.mapControl}
                          radius={radius} onRadiusChange={setRadius}
                          coverage={coverage} onCoverageChange={setCoverage}
                          lowerPercentile={lowerPercentile} onLowerPercentileChange={setLowerPercentile}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ReplayControl className={classes.replayControl}
                         elevation={0} maxStep={data.params.total_step / 14}
                         step={step} onStepChange={setStep}/>
        </Box>
        <Divider/>
        <Box className={classes.bottomBox}>
          {/* Maps */}
          <Grid className={classes.mapGrid} container spacing={0}>
            {findSelectedMetrics(metrics)
                .map((metric, index) => (
                    <Grid key={metric} xs={computeMapSize()} item className={classes.border}>
                      <MetricMap viewState={viewState}
                                 radius={radius} coverage={coverage} lowerPercentile={lowerPercentile}
                                 showNav={index === findSelectedMetrics(metrics).length - 1}
                                 onViewStateChange={setViewState}
                                 data={data.replay?.regionReplay.filter((d) => d.day === step - 1) || []}
                                 metricName={metric}/>
                    </Grid>
                ))}
          </Grid>
        </Box>
      </Box>
  )
}

export default SimulationView;