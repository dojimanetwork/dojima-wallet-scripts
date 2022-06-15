export enum FeeOption {
  Average = "average",
  Fast = "fast",
  Fastest = "fastest",
}

export type FeeRates = Record<FeeOption, number>;
