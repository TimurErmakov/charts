import { config } from '../constants/configs';
import { FieldNames } from '../enums/dataset';
import { DataModel } from '../types/store';

interface Counter {
  [key: string]: number;
}

interface ChartData {
  value: number;
  category: string;
}

export const getData = (data: DataModel[], fieldName: FieldNames): ChartData[] => {
  const entries = Object.entries(config[fieldName]);

  const initialCounter = entries.reduce(
    (acc, [key]) => ({
      ...acc,
      [key]: 0,
    }),
    {},
  );

  const counter: Counter = data.reduce(
    (acc: Counter, { [fieldName]: field }) => ({
      ...acc,
      [field]: acc[field] + 1,
    }),
    initialCounter,
  );

  const chartData = entries.map(([key, category]) => ({
    value: counter[key],
    category,
  }));

  return chartData;
};
