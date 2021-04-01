import { PieChart, RadarChart, XYChart } from '@amcharts/amcharts4/charts';

export type Amchart = PieChart | RadarChart | XYChart;

export type AmchartCreator = new () => Amchart;
