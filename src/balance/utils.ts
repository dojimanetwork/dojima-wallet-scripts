export interface FeeResult {
    asset_fee: number;
    usdt_fee: number;
}
export interface GasfeeResult {
    slow: {
        fee: FeeResult;
    };
    average: {
        fee: FeeResult;
    };
    fast: {
        fee: FeeResult;
    };
}