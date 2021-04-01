import { useLayoutEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import { getData } from '../utils/dictionary';
import { DataModel } from '../types/store';
import { FieldNames } from '../enums/dataset';
import { Amchart, AmchartCreator } from '../types/amcharts';

interface UseChartProps {
  type: AmchartCreator;
  data: DataModel[];
  fieldName: FieldNames;
  callback: (chart: Amchart) => void;
  target?: string;
}

export const useChart = ({
  type,
  target = 'chartdiv',
  fieldName,
  data,
  callback,
}: UseChartProps): void => {
  useLayoutEffect(() => {
    if (!fieldName) {
      return;
    }

    const chart: Amchart = am4core.create(target, type);
    const parsedData = getData(data, fieldName);

    chart.data = parsedData;
    callback(chart);

    return () => {
      chart.dispose();
    };
  }, [callback, data, fieldName, target, type]);
};
