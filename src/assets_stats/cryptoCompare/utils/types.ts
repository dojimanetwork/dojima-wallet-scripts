export type DataObject = {
  id: number;
  time: number;
  symbol: string;
  partner_symbol: string;
  zero_balance_addresses_all_time: number;
  unique_addresses_all_time: number;
  new_addresses: number;
  active_addresses: number;
  average_transaction_value: number;
  block_height: number;
  hashrate: number;
  difficulty: number;
  block_time: number;
  block_size: number;
  current_supply: number;
  transaction_count: number;
  transaction_count_all_time: number;
  large_transaction_count: number;
};

export type LatestDataResult = {
  Response: string;
  Message: string;
  HasWarning: boolean;
  Type: number;
  RateLimit: [];
  Data: DataObject;
};

export type TaxonomyObject = {
  Access: string;
  FCA: string;
  FINMA: string;
  Industry: string;
  CollateralizedAsset: string;
  CollateralizedAssetType: string;
  CollateralType: string;
  CollateralInfo: string;
};

export type RatingWeissObject = {
  Rating: string;
  TechnologyAdoptionRating: string;
  MarketPerformanceRating: string;
};

export type RatingObject = {
  Weiss: RatingWeissObject;
};

export type ListDataObject = {
  Id: string;
  Url: string;
  ImageUrl: string;
  ContentCreatedOn: number;
  Name: string;
  Symbol: string;
  CoinName: string;
  FullName: string;
  Description: string;
  AssetTokenStatus: string;
  Algorithm: string;
  ProofType: string;
  SortOrder: string;
  Sponsored: boolean;
  Taxonomy: TaxonomyObject;
  Rating: RatingObject;
  IsTrading: boolean;
  TotalCoinsMined: number;
  CirculatingSupply: number;
  BlockNumber: number;
  NetHashesPerSecond: number;
  BlockReward: number;
  BlockTime: number;
  AssetLaunchDate: string;
  AssetWhitepaperUrl: string;
  AssetWebsiteUrl: string;
  MaxSupply: number;
  MktCapPenalty: number;
  IsUsedInDefi: number;
  IsUsedInNft: number;
  PlatformType: string;
  SmartContractAddress: string;
  BuiltOn: string;
  DecimalPoints: number;
};

export type ListDataResult = {
  [key: string]: ListDataObject;
};

export type ResponseObject = {
  Response: string;
  Message: string;
  Data: ListDataResult;
  RateLimit: [];
  HasWarning: boolean;
  Type: number;
};
