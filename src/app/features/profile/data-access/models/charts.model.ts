import {Color} from '@swimlane/ngx-charts';

export interface ChartMainConfig {
  view: [number, number];
  colorScheme: Color;
  showXAxis: boolean;
  showYAxis: boolean;
  gradient: boolean;
  showLegend: boolean;
  showXAxisLabel: boolean;
  xAxisLabel: string;
  showYAxisLabel: boolean;
  yAxisLabel: string;
  animations?: boolean;
  roundEdges?: boolean;
  barPadding?: number;
}

export interface ChartData {
  name: string;
  value: number;
}

export interface ActivitiesData {
  steps: ChartData[];
  activeMinutes: ChartData[];
  calories: ChartData[];
  distance: ChartData[];
  heartRateAvg: ChartData[];
  sleepQuality: ChartData[];
}
