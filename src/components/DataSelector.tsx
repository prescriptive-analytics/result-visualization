import React, {FormEvent, useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import FileInput from "./FileInput";
import CsvLoader from "../util/CsvLoader";
import {VizualizationData} from "../util/DataModel";
import JsonLoader from "../util/JsonLoader";

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

type SimulationConfig = {
  [key: string]: any;

  regionsFile: string;
  dailyStatsFile?: string;
  regionStatsFile?: string;
}

type SimulationFilesFormProps = {
  onDataSelected: (data: VizualizationData) => void;
  onError?: (err: any) => void;
};

const DataSelector: React.FC<SimulationFilesFormProps> = ({onDataSelected, onError}) => {
  const classes = useStyles();

  const [configFile, setConfigFile] = useState<File>();
  const [hasError, setHasError] = useState(false);

  const loadConfig = async (config: SimulationConfig, filename: string) => {
    if (!config.regionsFile) {
      throw new Error("Config file is missing 'regionsFile' property.");
    }

    // Loads the region metadata.
    const loader = new CsvLoader();
    const regions = await loader.Load(config.regionsFile);

    const vizData: VizualizationData = {
      filename,
      params: config,
      regions: regions.rows
    };

    if (config.dailyStatsFile && config.regionStatsFile) {
      // Loads Daily Replay file.
      const dailyReplay = await loader.Load(config.dailyStatsFile);

      // Loads Regions Replay file.
      const regionReplay = await loader.Load(config.regionStatsFile);

      vizData.replay = {
        dailyReplay: dailyReplay.rows,
        regionReplay: regionReplay.rows
      };
    }

    onDataSelected(vizData);
  }

  const handleFileSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (configFile === undefined) {
      setHasError(true);
      return;
    }

    const loader = new JsonLoader();
    loader.Load<SimulationConfig>(configFile)
        .then((config) => {
          return loadConfig(config, configFile.name);
        })
        .catch((err) => {
          console.log(err);
          setHasError(true);
          onError && onError(err);
        });
  };

  useEffect(() => {
    setHasError(false);
  }, [configFile]);

  return (
      <form noValidate className={classes.root} onSubmit={handleFileSubmit}>
        <FileInput id="config-file" name="Simulation Config File from 'public/' directory (config.json)" error={hasError} onFileChange={setConfigFile}/>
        <Button fullWidth variant="outlined" type="submit" color="primary" className={classes.filesLoadButton}>
          Load
        </Button>
        <Typography>
          Config file example
        </Typography>
        <pre>
          <code>
            &#123; <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"strategy": "0000000", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"daysToTrack": 5, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"startIntervene": 1, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"regionInfectedThresForStrangerContact": 1, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"daysToTreat": 1e9, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"daysToIsolate": 15, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"daysToQuarantine": 15, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"daysToConfine": 15, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"seed": 1, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"dir": "./examples", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"predefinedStrategy": true, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"saveReplay": false, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"results_dir": "results", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"save_replay_dir": "", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"pAcq": 0.0015, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"pStranger": 0.000003, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"round": 0, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"location_file": "w_small_visual.json", <br/>

              &nbsp;&nbsp;&nbsp;&nbsp;"population": 10000, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"total_step": 840, <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"regionsFile": "sample/w_small_5.csv", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"dailyStatsFile": "sample/daily_stats_0000000_1_5_15_15_15_1.csv", <br/>
              &nbsp;&nbsp;&nbsp;&nbsp;"regionStatsFile": "sample/region_stats_0000000_1_5_15_15_15_1.csv" <br/>
            &#125;
          </code>
        </pre>
      </form>
  );
}

export default DataSelector;