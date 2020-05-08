import React from "react";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";

import {SimulationParams} from "../util/DataModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
      },
      tableContainer: {
        overflow: 'scroll',
        width: '100%',
        height: '100%',
        border: `1px solid ${theme.palette.divider}`,
      },
      table: {
        width: '100%',
        height: '100%',
      },
    }),
);

type MetricsTableProps = {
  className?: string;
  showHeader?: boolean;
  elevation?: number;
  simulationParams: SimulationParams;
}

export const MetricsTable: React.FC<MetricsTableProps> = (props) => {
  const classes = useStyles();

  const {className, showHeader, elevation = 1, simulationParams} = props;

  return (
      <div className={className || classes.root}>
        <TableContainer component={Paper} elevation={elevation} className={classes.tableContainer}>
          <Table className={classes.table} size="small" stickyHeader={true} aria-label="Simulation metrics">
            {showHeader && (
                <TableHead>
                  <TableRow>
                    <TableCell>Parameter</TableCell>
                    <TableCell align="right">Value</TableCell>
                  </TableRow>
                </TableHead>
            )}
            <TableBody>
              {simulationParams && Object.keys(simulationParams).map((key) => (
                  <TableRow hover key={key}>
                    <TableCell component="th" scope="row">
                      {key}
                    </TableCell>
                    <TableCell align="right">
                      {simulationParams[key].toString() || ''}
                    </TableCell>
                  </TableRow>
              ))}
              {/*{simulationParams && params.map((row) => (*/}
              {/*    <TableRow key={row.key}>*/}
              {/*      <TableCell component="th" scope="row">*/}
              {/*        {row.title}*/}
              {/*      </TableCell>*/}
              {/*      <TableCell align="right">*/}
              {/*        {(simulationParams as any)[row.key]}*/}
              {/*      </TableCell>*/}
              {/*    </TableRow>*/}
              {/*))}*/}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
  );
}

export default MetricsTable;