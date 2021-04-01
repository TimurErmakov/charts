import React, { FC, useRef, useCallback } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useStyles } from '../Chart.styles';
import { useChart } from '../../../hooks/useChart';
import { Amchart } from '../../../types/amcharts';
import { ChartProps } from '../Chart.types';

am4core.useTheme(am4themes_animated);

const PieChart: FC<ChartProps> = ({ data, fieldName }) => {
  const classes = useStyles({});
  const chartRef = useRef<am4charts.PieChart | null>(null);

  const callback = useCallback((chart: Amchart) => {
    const pieChart = chart as am4charts.PieChart;
    const series = pieChart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'label';

    chartRef.current = pieChart;
  }, []);

  useChart({ type: am4charts.PieChart, fieldName, data, callback });

  return <div id="chartdiv" className={classes.chart} />;
};

export default PieChart;
