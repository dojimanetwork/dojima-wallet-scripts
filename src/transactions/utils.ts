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
export type BtcTxDataResult = {
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
export type SolTxDataResult = {
  timeStamp: Date;
  gasFee: number;
  amount: number;
  status: string;
  block: number;
  from: string;
  to: string;
  recentBlockHash: string;
  instructionData: string;
};
export type SolTxHistoryParams = {
  address: string;
  offset?: number;
  beforeHash?: string;
  untilHash?: string;
};
