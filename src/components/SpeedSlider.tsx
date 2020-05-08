import React from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import RemoveIcon from "@material-ui/icons/Remove";
import Slider from "@material-ui/core/Slider";
import AddIcon from "@material-ui/icons/Add";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      margin: theme.spacing(0, 2),
    },
  }),
);

type SpeedSliderProps = {
  value: number;
  onValueChange: (value: number) => void;
};

const SpeedSlider: React.FC<SpeedSliderProps> = ({value, onValueChange}) => {
  const classes = useStyles();

  const handleChange = (event: any, newValue: number | number[]) => {
    if (newValue < 0) {
      newValue = 0;
    } else if (newValue > 100) {
      newValue = 100;
    }
    onValueChange(newValue as number);
  };

  return (
      <Paper className={classes.root} elevation={0}>
        <Grid container spacing={2}>
          <Grid item>
            <IconButton size="small" aria-label="decrease-speed"
                        disabled={value <= 0}
                        onClick={(e) => handleChange(e, value - 5)}>
              <RemoveIcon/>
            </IconButton>
          </Grid>
          <Grid item xs>
            <Slider value={value} onChange={handleChange} aria-labelledby="replay-speed"/>
          </Grid>
          <Grid item>
            <IconButton size="small" aria-label="increase-speed"
                        disabled={value >= 100}
                        onClick={(e) => handleChange(e, value + 5)}>
              <AddIcon/>
            </IconButton>
          </Grid>
        </Grid>
      </Paper>
  );
};

export default SpeedSlider;