export type DailyShifts = {
  date: Date;
  shifts: number;
};

export type ShiftsSummary = {
  reference_date: Date;
  daily_shifts: DailyShifts[];
};

export type Metric = {
  value: number;
  isPercentage: boolean;
  comment?: string;
  pctChange_1month?: number;
  pctChange_3month?: number;
  pctChange_6month?: number;
  pctChange_1year?: number;
};

export type MetricsSummary = {
  no_show_rate: Metric;
  overtime_rate: Metric;
  punctuality_rate: Metric;
  average_bf_score: Metric;
};
