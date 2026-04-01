export type DailyTotalShifts = {
  date: Date;
  shifts: number;
};

export type ShiftsSummary = {
  reference_date: Date;
  daily_shifts: DailyTotalShifts[];
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

export type MedianMetricsSummary = {
  no_show_rate: Metric;
  overtime_rate: Metric;
  punctuality_rate: Metric;
  bf_score: Metric;
};
