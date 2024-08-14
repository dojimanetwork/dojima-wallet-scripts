import { Chain } from "../chain";

export type Asset = {
  chain: Chain;
  symbol: string;
  ticker: string;
  synth: boolean;
};

export type SwapAssetList =
  | "AR.AR"
  | "BTC.BTC"
  | "BNB.BNB"
  | "DOJ.DOJ"
  | "DOT.DOT"
  | "ETH.ETH"
  | "SOL.SOL";

export type InboundAddressResult = {
  chain: string;
  pub_key:
    | {
        secp256k1: string;
        ed25519: string;
      }
    | string;
  address: string;
  halted: boolean;
  gas_rate: string;
  gas_rate_units?: string;
  outbound_tx_size?: string;
  outbound_fee?: string;
  router?: string;
};
