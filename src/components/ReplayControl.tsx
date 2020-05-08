import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import Slider from "@material-ui/core/Slider";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import InfoIcon from '@material-ui/icons/Info';
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {},
      controlPaper: {
        display: 'relative',
        // margin: theme.spacing(1),
        // padding: theme.spacing(0, 4),
        // padding: theme.spacing(0, 1, 0, 4),
        width: '100%',
        height: '100%',
      },
      padding: {
        padding: theme.spacing(0, 1),
      },
      infoIcon: {
        position: "absolute",
        bottom: 20,
        left: 15,
      },
    }),
);

type ReplayControlProps = {
  className?: string;
  elevation?: number;
  step?: number;
  maxStep?: number;
  onStart?: () => void;
  onPause?: () => void;
  onReset?: () => void;
  onStepChange?: (nextStep: number) => void;
}

const ReplayControl: React.FC<ReplayControlProps> = (props) => {
  const classes = useStyles();

  const {className, elevation = 1, onStart, onPause, onReset, onStepChange} = props;
  const {step = 1, maxStep = 100} = props;

  const [isRunning, setIsRunning] = useState(false);
  // Replay speed in steps per second.
  const [replaySpeed] = useState(4);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  }
  const resetSimulation = () => {
    setIsRunning(false);
    onReset ? onReset() : (onStepChange && onStepChange(1));
  }

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    if (newValue >= 1 && newValue <= maxStep) {
      onStepChange && onStepChange(newValue as number);
    }
  }

  useEffect(() => {
    if (isRunning) {
      const timeout = 1000 / replaySpeed; // 1 second divided by number of steps per second.
      let currStep = step;
      const t = window.setInterval(() => {
        if (currStep > maxStep) {
          setIsRunning(false);
        } else {
          onStepChange && onStepChange(currStep++);
        }
      }, timeout);
      return () => window.clearInterval(t);
    }
  }, [onStepChange, step, maxStep, replaySpeed, isRunning])

  useEffect(() => {
    if (isRunning) {
      onStart && onStart();
    } else {
      onPause && onPause();
    }
  }, [onStart, onPause, isRunning]);

  useEffect(() => {
    if (step !== 1) {
      onStepChange && onStepChange(step);
    }
  }, [onStepChange, step]);

  return (
      <div className={className || classes.root}>
        <Paper elevation={elevation} className={classes.controlPaper}>
          {/* Info */}
          <Tooltip title={`Replay Speed: ${replaySpeed} days/second`} placement="bottom" arrow>
            <InfoIcon className={classes.infoIcon} fontSize="small" color="action"/>
          </Tooltip>
          {/* Step indicator & selector */}
          <Grid container spacing={0}>
            <Grid item className={classes.padding}>
              <IconButton size="small" aria-label="decrease-step"
                          disabled={isRunning || step <= 1}
                          onClick={(e) => handleSliderChange(e, step - 1)}>
                <RemoveIcon/>
              </IconButton>
            </Grid>
            <Grid item xs className={classes.padding}>
              <Slider value={step} max={maxStep} min={1}
                      onChange={handleSliderChange}
                      aria-label="step"/>
            </Grid>
            <Grid item className={classes.padding}>
              <IconButton size="small" aria-label="increase-step"
                          disabled={isRunning || step >= maxStep}
                          onClick={(e) => handleSliderChange(e, step + 1)}>
                <AddIcon/>
              </IconButton>
            </Grid>
          </Grid>
          {/* Controls */}
          <Grid container spacing={0} justify="center">
            <Grid item className={classes.padding}>
              <Tooltip title={`Replay Speed: ${replaySpeed} days/second`} placement="bottom" arrow>
                <Button variant="outlined" size="small" onClick={toggleSimulation} disabled={step === maxStep}>
                  {isRunning ? "Pause" : "Start"}
                </Button>
              </Tooltip>
            </Grid>
            <Grid item className={classes.padding}>
              <Button variant="outlined" size="small" onClick={resetSimulation} disabled={step === 1}>
                Reset
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </div>
  )
}

export default ReplayControl;