import { Network } from "../client";

export type FioClientParams = {
  phrase: string;
  network: Network;
  apiUrl: string;
};

export type GenerateKeysType = {
  privateKey: string;
  publicKey: string;
  account: string;
};

export type HandleRegisteredType = {
  is_registered: 1 | 0;
};

export type TokenMappedPubAddressType = {
  public_address: string;
};

export type TokenPubAddressType = {
  public_address: string;
  token_code: string;
  chain_code: string;
};

export type AllTokenMappedPubAddressType = {
  public_addresses: Array<TokenPubAddressType>;
  more: boolean;
};

export type HandleArrayType = {
  fio_address: string;
  expiration?: string;
  remaining_bundled_tx: number;
};

export type AllHandlesResultType = {
  fio_addresses: Array<HandleArrayType>;
  more: boolean;
};

export type TokenBalanceResultType = {
  balance: number;
  available: number;
  staked: number;
  srps: number;
  roe: string;
};

export type ActorResultType = {
  actor: string;
};
