import * as Bitcoin from "bitcoinjs-lib";

export type Witness = {
  value: number;
  script: Buffer;
};

export type UTXO = {
  hash: string;
  index: number;
  value: number;
  witnessUtxo: Witness;
  txHex?: string | undefined;
};

export interface BuildTxResult {
  psbt: Bitcoin.Psbt;
  utxos: UTXO[];
  inputs: any;
}

export type BtcAddressUTXO = {
  txid: string;
  output_no: number;
  script_asm: string;
  script_hex: string;
  value: string;
  confirmations: number;
  time: number;
};

export type BtcUnspentTxsDTO = {
  network: string;
  address: string;
  txs: BtcAddressUTXO[];
};

export interface SochainResponse<T> {
  data: T;
  status: string;
}

export type TxConfirmedStatus = {
  network: string;
  txid: string;
  confirmations: number;
  is_confirmed: boolean;
};

export interface TxIO {
  input_no: number;
  value: string;
  address: string;
  type: string;
  script: string;
}

export interface SochainTransaction {
  network: string;
  txid: string;
  blockhash: string;
  confirmations: number;
  time: number;
  tx_hex: string;
  inputs: TxIO[];
  outputs: TxIO[];
}

export type UtxoData = {
  txid: string;
  index: number;
  value: number;
  pkscript: string;
};

export type BalanceData = {
  address: string;
  confirmed: number;
  unconfirmed: number;
  utxo: number;
  txs: number;
  received: number;
};
