import {SubmittableExtrinsic} from "@polkadot/api/types";
import {ISubmittableResult} from "@polkadot/types/types";
import {Network} from "@d11k-ts/client";

export type rawTxType = SubmittableExtrinsic<"promise", ISubmittableResult>

export type ProviderId = string
export type ProviderIds = Record<Network, ProviderId>

export type PolkachainClientParams = {
    providers?: ProviderIds
}

export type PolkaTxParams = {
    recipient: string,
    amount: number
}

export type GasfeeResult = {
    slow: number;
    average: number;
    fast: number;
}