export enum LineRange {
  ten = 11,
  twenty = 21,
  hundred = 101,
  hundredCircular = 100,
}

export type RulerItem = {
  value: number;
  isMainLine: boolean;
};

export enum RulerLenth  {
  hundred = 21,
  other = 101 
};