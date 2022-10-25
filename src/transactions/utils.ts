export type SortType = "desc" | "asc";
export type ActionType =
  | "balance"
  | "balancemulti"
  | "txlist"
  | "txlistinternal"
  | "tokentx"
  | "tokennfttx"
  | "getminedblocks"
  | "eth_getTransactionByHash";

export type BtcTxHistoryBlockObject = {
  height: number;
  position: number;
};
export type BtcTxHistoryResult = {
  txid: string;
  block: BtcTxHistoryBlockObject;
};
export type BtcTxDataInputObject = {
  coinbase: boolean;
  txid: string;
  output: number;
  sigscript: string;
  sequence: number;
  pkscript: string;
  value: number;
  address: string;
  witness: [];
};
export type BtcTxDataOutputObject = {
  address: string;
  pkscript: string;
  value: number;
  spent: boolean;
  spender: {
    txid: string;
    input: number;
  } | null;
};
export type BtcTxHashDataResult = {
  txid: string;
  size: number;
  version: number;
  locktime: number;
  fee: number;
  inputs: BtcTxDataInputObject[];
  outputs: BtcTxDataOutputObject[];
  block: BtcTxHistoryBlockObject;
  deleted: boolean;
  time: number;
  rbf: boolean;
  weight: number;
};

export interface BtcTxsArray {
  transaction_hash: string;
  block: number;
}

export interface BtcTxsResult {
  txs: Array<BtcTxsArray>;
}

export interface BtcTxDataResult {
  txid: string;
  size: number;
  version: number;
  locktime: number;
  fee: number;
  inputs: BtcTxDataInputObject[];
  outputs: BtcTxDataOutputObject[];
  block: BtcTxHistoryBlockObject;
  deleted: boolean;
  timestamp: string;
  rbf: boolean;
  weight: number;
  from: string;
  fromValue: number;
  to1: string;
  to1Value: number;
  to2: string;
  to2Value: number;
}

export type TxHistoryParams = {
  address: string;
  apiKey: string;
  page?: number;
  limit?: number;
  sort?: SortType;
  startBlock?: number;
  endBlock?: number;
};
export type BinanceChainTxHistory = {
  fromAddress: string;
  // limit:number;
  // offset:string;
  // startTime:string;
  // txAsset:string;
};
export type ERC20TxHistoryParams = {
  apiKey: string;
  action: ActionType;
  contractAddress: string;
  fromAddress: string;
  page?: number;
  limit?: number;
  sort?: SortType;
  startBlock?: number;
  endBlock?: number;
};

export type ERC20TxsArray = {
  blockNumber: number;
  timeStamp: Date;
  hash: string;
  nonce: number;
  blockHash: string;
  transactionIndex: number;
  from: string;
  to: string;
  value: number;
  gas: string;
  gasPrice: number;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: number;
}

export type ERC20TxsResult = {
  txs: Array<ERC20TxsArray>;
}

export type BinanaceTxDetailsResult = {
  txHash: string;
  blockHeight: string;
  txType: string;
  timeStamp: string;
  fromAddr: string;
  toAddr: string;
  value: string;
  txAsset: string;
  txFee: string;
  proposalld: string;
  txAge: string;
  orderId: string;
  code: string;
  data: string;
  confimrblocks: string;
  memo: string;
  source: string;
  sequence: string;
};
export type EthTxDetailsResult = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
};
export type EthTxsArrayResult = {
  block: number;
  date: string;
  time: string;
  transaction_hash: string;
  contract_address: string;
  value: number;
  gas_price: string;
  from: string;
  transaction_type: string;
}

export type EthTxsResult = {
  txs: Array<EthTxsArrayResult>;
}
export type TransactionHistoryResult = {
  status: string;
  message: string;
  result: EthTxDetailsResult[];
};
export type TxHashDataParams = {
  hash: string;
  address: string;
  apiKey: string;
};
export type EthTxHashDataResult = {
  blockHash: string;
  blockNumber: string;
  from: string;
  gas: string;
  gasPrice: string;
  hash: string;
  input: string;
  nonce: string;
  to: string;
  transactionIndex: string;
  value: string;
  type: string;
  v: string;
  r: string;
  s: string;
};

export interface EthTxDataResult {
  blockHash: string;
  blockNumber: number;
  from: string;
  gas_limit: string;
  gasPrice: number;
  hash: string;
  input: string;
  nonce: number;
  to: string;
  transactionIndex: number;
  value: number;
  type: string;
  v: string;
  r: string;
  s: string;
}

export type BinanceTransactionHistoryResult = {
  tx: BinanaceTxDetailsResult[];
  total: string;
};
export type TransactionHashDataResult = {
  jsonrpc: string;
  id: string;
  result: EthTxHashDataResult;
};
export type BtcTxHistoryParams = {
  address: string;
  startIndex?: number;
  limit?: number;
};
export interface SolTxDataResult {
  timeStamp: number;
  gasFee: number;
  amount: number;
  status: string;
  block: number;
  from: string;
  to: string;
  recentBlockHash: string;
  instructionData: string;
};
export interface SolTxHistoryParams {
  address: string;
  offset?: number;
  beforeHash?: string;
  untilHash?: string;
};
export interface SolTxsArrayType {
  transaction_hash: string;
  block: number;
  date: string;
  time: string;
}
export interface SolTxsResult {
  txs: Array<SolTxsArrayType>;
}

export interface Avax_item{
  from_address: any;
  to_address: any;
  fees_paid: any;
  block_signed_at: string;
  block_height: number;
  tx_hash : string;
  tx_offset:number;
  successful:true;
  from: string;
  from_address_label:string;
  to :string;
  to_address_label : string;
  value :string;
  value_quote:string;
  gas_offered:number;
  gas_spent:number;
  gas_price:number;
  gasFee: number;
  gas_quote:number;
  gas_quote_rate:number;
  log_events:[];
}

export interface AvaxTxHistroy{
  date:string;
  block_height: number;
  tx_hash : string;
  from: string;
  to :string;
  value :string;
  gasFee: number;
}

export interface AvaxTxHistroyData{
  date: string;
  address:string;
  updated_at:Date;
  next_updated_at:Date;
  quote_currency:string;
  chain_id :number;
  items: Array<Avax_item>;
  pagination:AvaxTxHistroyPagination;
}

export interface AvaxTxHistroyFinalData{
  data:AvaxTxHistroyData
  error: boolean;
  error_message:string;
  error_code:string
}

export interface AvaxTxHistroyPagination{
  has_more : boolean;
  page_number:number;
  page_size: number;
  total_count:number;
}

export interface AvaxDetailTranscationData{
  updated_at:Date;
  items: Array<Avax_item>;
  pagination:AvaxTxHistroyPagination;
  error: boolean;
  error_message:string;
  error_code:string
}
