import React, {FormEvent, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import FileInput from "./FileInput";
import CsvLoader from "../util/CsvLoader";
import {SimulationData} from "../util/DataModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        padding: theme.spacing(1),
      },
      margin: {
        margin: theme.spacing(0, 1),
      },
      filesLoadButton: {
        margin: theme.spacing(1, 0),
      },
    }),
);

type SimulationFilesFormProps = {
  onDataChange: (data: SimulationData) => void;
  onError?: (err: Error) => void;
};

const SimulationFilesForm: React.FC<SimulationFilesFormProps> = ({onDataChange, onError}) => {
  const classes = useStyles();

  const [regionsFile, setRegionsFile] = useState<File | undefined>(undefined);
  const [dailyReplayFile, setDailyReplayFile] = useState<File | undefined>(undefined);
  const [regionReplayFile, setRegionReplayFile] = useState<File | undefined>(undefined);
  const [errors, setErrors] = useState({poi: false, daily: false, regions: false});

  const handleFileSubmit = (event: FormEvent) => {
    event.preventDefault();
    const err = {
      poi: regionsFile === undefined,
      daily: dailyReplayFile === undefined,
      regions: regionReplayFile === undefined,
    }
    setErrors(err);
    if (regionsFile && dailyReplayFile && regionReplayFile) {
      const loader = new CsvLoader();
      // Loads Regions file.
      // TODO

      // Loads Daily Replay file.
      const dailyReplayPromise = loader.Load(dailyReplayFile);

      // Loads Regions Replay file.
      const regionReplayPromise = loader.Load(regionReplayFile);

      Promise.all([dailyReplayPromise, regionReplayPromise])
          .then(([dailyReplayResult, regionReplayResult]) => {
            onDataChange({
              dailyReplay: dailyReplayResult.rows,
              regionReplay: regionReplayResult.rows
            });
          })
          .catch((err) => {
            if (onError) {
              onError(err);
            }
          });
    }
  };

  return (
      <form noValidate className={classes.root} onSubmit={handleFileSubmit}>
        <FileInput id="regions-file" name="Regions" error={errors.poi} required onFileChange={setRegionsFile}/>
        <FileInput id="daily-replay-file" name="Daily Replay Stats" error={errors.daily} required
                   onFileChange={setDailyReplayFile}/>
        <FileInput id="region-file" name="Region Replay Stats" error={errors.regions} required
                   onFileChange={setRegionReplayFile}/>
        <Button fullWidth variant="outlined" type="submit" color="primary" className={classes.filesLoadButton}>
          Load
        </Button>
      </form>
  );
}

export default SimulationFilesForm;