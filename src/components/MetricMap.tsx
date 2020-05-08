import React, {useEffect, useState} from "react";
import _ from "lodash";
import DeckGL, {Layer, HexagonLayer} from "deck.gl";
import StaticMap, {NavigationControl, _MapContext as MapContext} from "react-map-gl";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import {LocationData} from "../util/DataModel";

import "mapbox-gl/dist/mapbox-gl.css";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        position: 'relative',
        width: '100%',
        height: '100%',
      },
      mapNav: {
        position: "absolute",
        zIndex: 99,
        right: "15px",
        bottom: "25px",
      },
      metricLabel: {
        position: "absolute",
        left: "15px",
        top: "25px",
        padding: theme.spacing(1),
        width: 135
      },
      tooltip: {
        background: 'white',
        padding: theme.spacing(1),
      }
    }),
);

type MetricMapProps = {
  viewState?: any;
  radius?: number;
  coverage?: number;
  lowerPercentile?: number;
  onViewStateChange?: (viewState: any) => void;
  showNav?: boolean;
  data: LocationData[];
  metricName: string;
}

export const MetricMap: React.FC<MetricMapProps> = (props) => {
  const classes = useStyles();

  const {viewState, onViewStateChange, showNav, data, metricName} = props;
  const {radius = 1000, coverage = 0.9, lowerPercentile = 0} = props;

  const [layer, setLayer] = useState<Layer<any>>();
  const [feature, setFeature] = useState({object: undefined, x: 0, y: 0});

  useEffect(() => {
    setLayer(new HexagonLayer({
      id: 'metric-layer',
      data,
      pickable: true,
      extruded: true,
      coverage: coverage,
      radius: radius,
      lowerPercentile: lowerPercentile,
      // elevationScale: 0,
      getPosition: (d: LocationData) => [d.lng, d.lat],
      getColorValue: (d: any[]) => _.sumBy(d, metricName),
      getElevationValue: (d: any) => _.sumBy(d as any[], metricName),
      onHover: ({object, x, y}: any) => {
        setFeature({object, x, y})
      }
    }))
  }, [radius, coverage, lowerPercentile, data, metricName])

  const renderTooltip = (object: any, x: number, y: number) => {
    return (
        <div className={classes.tooltip} style={{position: 'absolute', zIndex: 1, pointerEvents: 'none', left: x, top: y}}>
          { `${metricName}: ${object && object.colorValue}` }
        </div>
    );
  }

  return (
      <div className={classes.root}>
        <DeckGL viewState={viewState}
                onViewStateChange={(state) => onViewStateChange && onViewStateChange(state.viewState)}
                ContextProvider={MapContext.Provider}
                width={"100%"} height={"100%"}
                controller={true}
                layers={layer ? [layer] : []}>

          <Paper className={classes.metricLabel}>
            <Typography variant="subtitle2" align="center">
              {metricName}
            </Typography>
          </Paper>

          <StaticMap
              width={"100%"}
              height={"100%"}
              reuseMaps={true}
              mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
              mapStyle={"mapbox://styles/mapbox/light-v10"}/>

          {feature.object && renderTooltip(feature.object, feature.x, feature.y)}

          {showNav && (
              <div className={classes.mapNav}>
                <NavigationControl showCompass={false}/>
              </div>
          )}
        </DeckGL>
      </div>
  );
}

export default MetricMap;