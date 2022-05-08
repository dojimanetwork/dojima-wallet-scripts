import { CurrencyList } from "./lists";

export const AssetIds = [
  "arweave",
  "bitcoin",
  "binance",
  "ethereum",
  "solana",
  "polkadot",
];

export type MarketData = {
  current_price: {
    [key in CurrencyList]: number;
  };
  market_cap: {
    [key in CurrencyList]: number;
  };
  total_volume: {
    [key in CurrencyList]: number;
  };
};

export type PriceHistoryDataByDate = {
  id: string;
  symbol: string;
  name: string;
  localization: any;
  image: {
    thumb: string;
    small: string;
  };
  market_data: MarketData;
  community_data: any;
  developer_data: any;
  public_interest_stats: any;
};

export type PriceHistoryResult = {
  current_price: number;
  market_cap: number;
  total_volume: number;
};

export type DayPriceData = [number, number];

export type DayPriceDataResult = {
  date: string;
  price: number;
};

export type PriceHistoryDataByDays = {
  prices: [DayPriceData];
  market_caps: [DayPriceData];
  total_volumes: [DayPriceData];
};

export type PriceHistoryDataByDaysResult = {
  prices: DayPriceDataResult[];
  market_cap: DayPriceDataResult[];
  total_volume: DayPriceDataResult[];
};

export type ROI = {
  times: number;
  currency: string;
  percentage: number;
};

export type AssetsDetailedCurrentMarketDataResult = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  fully_diluted_valuation: number | undefined;
  total_volume: number;
  high_24h: number;
  low_24h: number;
  price_change_24h: number;
  price_change_percentage_24h: number;
  market_cap_change_24h: number;
  market_cap_change_percentage_24h: number;
  circulating_supply: number;
  total_supply: number | undefined;
  max_supply: number | undefined;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
  roi: ROI | undefined;
  last_updated: string;
};

export type AssetsCurrentMarketDataResult = {
  current_price: number;
  market_cap: number;
  total_volume: number;
  circulating_supply: number;
  total_supply: number | undefined;
  max_supply: number | undefined;
  ath: number;
  ath_change_percentage: number;
  ath_date: string;
  atl: number;
  atl_change_percentage: number;
  atl_date: string;
};
