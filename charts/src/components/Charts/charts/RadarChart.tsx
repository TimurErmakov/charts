import React, { FC, useRef, useCallback } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useStyles } from '../Chart.styles';
import { useChart } from '../../../hooks/useChart';
import { Amchart } from '../../../types/amcharts';
import { ChartProps } from '../Chart.types';

am4core.useTheme(am4themes_animated);

const RadarChart: FC<ChartProps> = ({ data, fieldName }) => {
  const classes = useStyles({});
  const chartRef = useRef<am4charts.RadarChart | null>(null);

  const callback = useCallback((chart: Amchart) => {
    const radarChart = chart as am4charts.RadarChart;
    const categoryAxis = radarChart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';

    radarChart.yAxes.push(new am4charts.ValueAxis() as any);

    const series = radarChart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';

    chartRef.current = radarChart;
  }, []);

  useChart({ type: am4charts.RadarChart, fieldName, data, callback });

  return <div id="chartdiv" className={classes.chart} />;
};

export default RadarChart;
