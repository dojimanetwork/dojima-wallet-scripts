export interface HaskoinBalanceResult {
  address: string;
  confirmed: number;
  unconfirmed: number;
  utxo: number;
  txs: number;
  received: number;
}

export interface SochainBalData {
  network: string;
  address: string;
  confirmed_balance: string;
  unconfirmed_balance: string;
}

export interface SochainBalanceResult {
  status: string;
  data: SochainBalData;
}

export interface RawTransactionResult {
  tx_hex: string;
  gas_fee: number;
}
