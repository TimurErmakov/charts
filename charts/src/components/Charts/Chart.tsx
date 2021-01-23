import React, { FC, useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import * as am4core from '@amcharts/amcharts4/core';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { selectChartType, selectData, selectFieldName } from '../../store/selectors';
import { Charts } from '../../enums/dataset';
import PieChart from './charts/PieChart';

am4core.useTheme(am4themes_animated);

const Chart: FC = () => {
  const data = useSelector(selectData)!;
  const fieldName = useSelector(selectFieldName)!;
  const chartType = useSelector(selectChartType)!;

  const chartProps = useMemo(
    () => ({
      data,
      fieldName,
    }),
    [data, fieldName],
  );

  const renderChart = useCallback(() => {
    switch (chartType) {
      case Charts.PieChart:
        return <PieChart {...chartProps} />;

      default:
        return null;
    }
  }, [chartType, chartProps]);

  return renderChart();
};

export default Chart;
