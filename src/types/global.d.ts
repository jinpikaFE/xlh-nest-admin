export type RuleResType<T = any> = {
  code: number;
  message: string;
  data: T;
  total?: number;
};

export type QueryCommon = {
  current: number;
  pageSize: number;
  startTime?: string;
  endTime?: string;
};
