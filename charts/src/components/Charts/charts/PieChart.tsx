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

const PieChart: FC<ChartProps> = ({ data, fieldName }) => {
  const chartRef = useRef<am4charts.PieChart | null>(null);

  useLayoutEffect(() => {
    if (!fieldName) {
      return;
    }

    const chart = am4core.create('chartdiv', am4charts.PieChart);

    const parsedData = getData(data, fieldName);

    chart.data = parsedData;

    const series = chart.series.push(new am4charts.PieSeries());
    series.dataFields.value = 'value';
    series.dataFields.category = 'label';

    chartRef.current = chart;

    return () => {
      chart.dispose();
    };
  }, [data, fieldName]);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
};

export default PieChart;
