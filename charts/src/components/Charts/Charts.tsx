import React, { FC, useRef, useLayoutEffect } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { selectChartType, selectData, selectFieldName } from '../../store/selectors';
import { getData } from '../../utils/dictionary';

am4core.useTheme(am4themes_animated);

const Charts: FC = () => {
  const data = useSelector(selectData)!;
  const fieldName = useSelector(selectFieldName)!;
  const chartType = useSelector(selectChartType)!;

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

    // eslint-disable-next-line consistent-return
    return () => {
      chart.dispose();
    };
  }, [data, fieldName]);

  return <div id="chartdiv" style={{ width: '100%', height: '500px' }} />;
};

export default Charts;
