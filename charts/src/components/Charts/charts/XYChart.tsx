import React, { FC, useRef, useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { DataModel } from '../../../types/store';
import { FieldNames } from '../../../enums/dataset';
import { getData } from '../../../utils/dictionary';

am4core.useTheme(am4themes_animated);

interface ChartProps {
  data: DataModel[];
  fieldName: FieldNames;
}

const XYChart: FC<ChartProps> = ({ data, fieldName }) => {
  const chartRef = useRef<am4charts.XYChart | null>(null);

  useLayoutEffect(() => {
    if (!fieldName) {
      return;
    }

    const chart = am4core.create('chartdiv', am4charts.XYChart);

    const parsedData = getData(data, fieldName);

    chart.data = parsedData;
    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'category';
    categoryAxis.renderer.labels.template.fontSize = 10;
    chart.yAxes.push(new am4charts.ValueAxis());

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.categoryX = 'category';
    series.dataFields.valueY = 'value';

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, fieldName]);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
};

export default XYChart;
