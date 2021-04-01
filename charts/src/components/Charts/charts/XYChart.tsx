import React, { FC, useRef, useCallback } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useStyles } from '../Chart.styles';
import { useChart } from '../../../hooks/useChart';
import { Amchart } from '../../../types/amcharts';
import { ChartProps } from '../Chart.types';

am4core.useTheme(am4themes_animated);

const XYChart: FC<ChartProps> = ({ data, fieldName }) => {
  const classes = useStyles({});
  const chartRef = useRef<am4charts.XYChart | null>(null);

  const callback = useCallback((chart: Amchart) => {
    const xyChart = chart as am4charts.XYChart;
    const categoryAxis = xyChart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.fontSize = 10;
    xyChart.yAxes.push(new am4charts.ValueAxis());

    const series = xyChart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'category';
    series.dataFields.valueY = 'value';

    chartRef.current = xyChart;
  }, []);

  useChart({ type: am4charts.XYChart, fieldName, data, callback });

  return <div id="chartdiv" className={classes.chart} />;
};

export default XYChart;
