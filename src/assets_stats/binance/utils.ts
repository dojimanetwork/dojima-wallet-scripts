export type LatestPricesResult = {
  symbol: string;
  price: number;
};

export type Last24HrResult = {
    symbol: string;
    priceChange: number;
    priceChangePercent: number;
    weightedAvgPrice: number;
    prevClosePrice: number;
    lastPrice: number;
    lastQty: number;
    bidPrice: number;
    bidQty: number;
    askPrice: number;
    askQty: number;
    openPrice: number;
    highPrice: number;
    lowPrice: number;
    volume: number;
    quoteVolume: number;
    openTime: number | string;
    closeTime: number | string;
    firstId: number;
    lastId: number;
    count: number;
};

// export type tokensList =
//   | 'BTC'
//   | 'ETH'
//   | 'USDT'
//   | 'BNB'
//   | 'USDC'
//   | 'SOL'
//   | 'XRP'
//   | 'LUNA'
//   | 'ADA'
//   | 'AVAX'
//   | 'AR'
//   | 'DOT'
//   | 'DOGE'
//   | 'BUSD'
//   | 'UST'
//   | 'SHIB'
// //   | 'WBTC'
//   | 'MATIC'
// //   | 'CRO'
//   | 'DAI'
//   | 'LINK'
//   | 'UNI'
//   | 'FTM'
//   | 'RUNE'
//   | 'AAVE'
//   | 'MKR'
//   | 'KSM'
//   | 'WRX';
