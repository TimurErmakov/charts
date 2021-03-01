import React, { FC, useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DataModel } from '../../../types/store';
import { FieldNames } from '../../../enums/dataset';
import { getData } from '../../../utils/dictionary';
import { useStyles } from '../Chart.styles';

am4core.useTheme(am4themes_animated);

interface ChartProps {
  data: DataModel[];
  fieldName: FieldNames;
}

const RadarChart: FC<ChartProps> = ({ data, fieldName }) => {
  const classes = useStyles({});
  const chartRef = useRef<am4charts.RadarChart | null>(null);

  useLayoutEffect(() => {
    if (!fieldName) {
      return;
    }

    const chart = am4core.create('chartdiv', am4charts.RadarChart);

    const parsedData = getData(data, fieldName);

    chart.data = parsedData;
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis() as any);
    categoryAxis.dataFields.category = 'category';

    chart.yAxes.push(new am4charts.ValueAxis() as any);

    /* Create and configure series */
    const series = chart.series.push(new am4charts.RadarSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'category';

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, fieldName]);

  return <div id="chartdiv" className={classes.chart} />;
};

export default RadarChart;
