import React, {useEffect, useState} from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";

import {SimulationData} from "../util/DataModel";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {},
    }),
);

const commonChartOptions: Highcharts.Options = {
  plotOptions: {
    series: {
      animation: {
        duration: 200,
      },
      opacity: 0.8,
    },
  },
  xAxis: {
    allowDecimals: false,
    minorTicks: true,
    title: {
      text: 'Days'
    },
  },
  tooltip: {
    headerFormat: '<span style="font-size: 10px">Day {point.key}</span><br/>'
  },
  credits: {
    enabled: false,
  },
  legend: {
    layout: 'vertical',
    align: 'right',
    verticalAlign: 'middle',
    itemMarginBottom: 5
  }
};

type MetricMap = {
  [key: string]: boolean;
};

type MetricsChartProps = {
  className?: string;
  title?: string;
  height?: number;
  metrics?: MetricMap;
  onMetricsChange?: (metrics: MetricMap) => void;
  step?: number;
  data?: SimulationData;
}

export const MetricsChart: React.FC<MetricsChartProps> = (props) => {
  const classes = useStyles();
  const {className, title, height, metrics, onMetricsChange, step, data} = props;

  const [chartOptions, setChartOptions] = useState<Highcharts.Options>({
    ...commonChartOptions,
    title: {
      text: title || '',
      style: {
        fontSize: 'small'
      }
    },
    chart: {
      height: height || 300,
    },
  });

  useEffect(() => {
    setChartOptions({
      ...commonChartOptions,
      plotOptions: {
        series: {
          ...commonChartOptions.plotOptions?.series,
          events: {
            legendItemClick: function () {
              if (metrics && onMetricsChange) {
                const newMetrics = {
                  ...metrics,
                  [this.name]: !this.visible
                };
                onMetricsChange(newMetrics);
              }
              return false;
            }
          }
        }
      },
      xAxis: {
        ...commonChartOptions.xAxis,
        plotLines: [{
          value: step,
          color: '#3f51b5',
          zIndex: 999,
        }],
      },
      series: Object.keys(metrics || {}).map((metric) => {
        return {
          type: 'line',
          name: metric,
          data: data?.dailyReplay.map((v, i) => {
            return [i + 1, (v as any)[metric]];
          }),
          visible: metrics ? metrics[metric] : true,
        };
      }),
    });
  }, [metrics, onMetricsChange, step, data]);

  return (
      <Box className={className || classes.root}>
        <HighchartsReact
            highcharts={Highcharts}
            options={chartOptions}
            allowChartUpdate={true}
        />
      </Box>
  );
}

export default MetricsChart;