import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Slider from "@material-ui/core/Slider";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      controlPaper: {
        // margin: theme.spacing(1),
        padding: theme.spacing(0, 1),
      },
      controlItemGrid: {
        // padding: theme.spacing(1),
      },
    }),
);

type MapControlProps = {
  className?: string;
  radius?: number;
  onRadiusChange?: (radius: number) => void;
  coverage?: number;
  onCoverageChange?: (radius: number) => void;
  lowerPercentile?: number;
  onLowerPercentileChange?: (radius: number) => void;
}

export const MapControl: React.FC<MapControlProps> = (props) => {
  const classes = useStyles();

  const {className} = props;
  const {radius = 1000, onRadiusChange = () => {}} = props;
  const {coverage = 1, onCoverageChange = () => {}} = props;
  const {lowerPercentile = 80, onLowerPercentileChange = () => {}} = props;

  return (
      <div className={className || classes.root}>
        <Paper className={classes.controlPaper}>
          <Grid container spacing={2} className={classes.controlItemGrid}>
            <Grid item>
              <Typography id="radius-slider">
                Radius
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider min={100} max={6500} step={100}
                      value={radius} onChange={(e, v) => onRadiusChange(v as number)}
                      aria-labelledby="radius-slider"/>
            </Grid>
            <Grid item>
              <Typography>
                {radius}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.controlItemGrid}>
            <Grid item>
              <Typography id="coverage-slider">
                Coverage
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider min={0} max={1} step={0.1}
                      value={coverage} onChange={(e, v) => onCoverageChange(v as number)}
                      aria-labelledby="coverage-slider"/>
            </Grid>
            <Grid item>
              <Typography>
                {coverage}
              </Typography>
            </Grid>
          </Grid>
          <Grid container spacing={2} className={classes.controlItemGrid}>
            <Grid item>
              <Typography id="percentile-slider">
                Lower Percentile
              </Typography>
            </Grid>
            <Grid item xs>
              <Slider min={0} max={5000} step={100}
                      value={lowerPercentile} onChange={(e, v) => onLowerPercentileChange(v as number)}
                      aria-labelledby="percentile-slider"/>
            </Grid>
            <Grid item>
              <Typography>
                {lowerPercentile}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </div>
  );
}

export default MapControl;