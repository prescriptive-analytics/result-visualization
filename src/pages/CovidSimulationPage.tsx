import React, {useEffect, useState} from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import ReplayIcon from '@material-ui/icons/Replay';

import DataSelector from "../components/DataSelector";
import ModelView from "../components/ModelView";
import SimulationView from "../components/SimulationView";
import {VizualizationData} from "../util/DataModel";

interface TabPanelProps {
  className?: string;
  children?: React.ReactNode;
  id: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const {children, value, index, ...other} = props;

  return (
      <div className={props.className}
           role="tabpanel"
           hidden={value !== index}
           {...other}
      >
        {value === index && children}
      </div>
  );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        display: 'flex',
        height: '100%',
      },
      toolbar: {},
      title: {
        padding: theme.spacing(0, 1)
      },
      fileContainer: {
        padding: theme.spacing(2, 3),
      },
      content: {
        flexGrow: 1,
        height: '100%',
        paddingTop: theme.spacing(8),
        backgroundColor: theme.palette.background.default,
      },
      tabs: {
        flexGrow: 1,
      },
      tab: {
        width: '100%',
        height: '100%',
      },
      reloadButton: {
        position: 'absolute',
        top: 70,
        left: 5,
      },
    }),
);

export const CovidSimulationPage = () => {
  const classes = useStyles();

  const [vizData, setVizData] = useState<VizualizationData>();
  const [tab, setTab] = useState(0)

  useEffect(() => {
    if (!vizData) {
      document.title = 'Load a file';
    } else {
      document.title = `${vizData.filename} - ${tab === 0 ? "Model View" : "Simulation View"}`;
    }
  }, [vizData, tab])

  return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              Simulation Visualization
            </Typography>
            {vizData && (
                <Tabs className={classes.tabs} value={tab} onChange={(e, v) => setTab(v)}
                      aria-label="view tabs">
                  <Tab label="Model View" id="model-tab" aria-controls="model-tab"/>
                  {vizData.replay && (
                      <Tab label="Simulation View" id="simulation-tab" aria-controls="simulation-tab"/>
                  )}
                  {/* Can add traces view. */}
                </Tabs>
            )}
            {vizData && (
                <Typography variant="h6" className={classes.title}>
                  {vizData.filename}
                </Typography>
            )}
            {/*{vizData && (*/}
            {/*    <Button color="primary" variant="contained" disableElevation*/}
            {/*            endIcon={<ReplayIcon/>}*/}
            {/*            onClick={() => setVizData(undefined)}>*/}
            {/*      Load Another Config*/}
            {/*    </Button>*/}
            {/*)}*/}
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          {!vizData && (
              <Container className={classes.fileContainer}>
                <DataSelector onDataSelected={setVizData}/>
              </Container>
          )}
          {vizData && (
              <React.Fragment>
                <TabPanel className={classes.tab} value={tab} index={0} id="model-tab">
                  <Button color="primary" variant="contained" disableElevation
                          className={classes.reloadButton}
                          endIcon={<ReplayIcon/>}
                          onClick={() => setVizData(undefined)}>
                    Load Another Config
                  </Button>
                  <ModelView data={vizData}/>
                </TabPanel>
                <TabPanel className={classes.tab} value={tab} index={1} id="simulation-tab">
                  <SimulationView data={vizData}/>
                </TabPanel>
              </React.Fragment>
          )}
        </main>
      </div>
  );
}

export default CovidSimulationPage;