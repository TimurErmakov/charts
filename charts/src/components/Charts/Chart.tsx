import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { selectChartType, selectData, selectFieldName } from '../../store/selectors';
import { Charts } from '../../enums/dataset';
import PieChart from './charts/PieChart';
import XYChart from './charts/XYChart';
import RadarChart from './charts/RadarChart';

am4core.useTheme(am4themes_animated);

const Chart: FC = () => {
  const data = useSelector(selectData);
  const fieldName = useSelector(selectFieldName);
  const chartType = useSelector(selectChartType);

  const renderChart = useCallback(() => {
    if (!data || !fieldName) {
      return null;
    }

    const chartProps = {
      data,
      fieldName,
    };

    switch (chartType) {
      case Charts.PieChart:
        return <PieChart {...chartProps} />;

      case Charts.XYChart:
        return <XYChart {...chartProps} />;

      case Charts.RadarChart:
        return <RadarChart {...chartProps} />;

      default:
        return null;
    }
  }, [data, fieldName, chartType]);

  return renderChart();
};

export default Chart;
