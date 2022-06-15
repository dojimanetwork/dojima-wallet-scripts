import axios, { AxiosError, AxiosResponse } from "axios";
import { NetworkType } from "../../types/interfaces/network";
import BTCUtxosClient from "./utxos";
import * as utils from "./utils";
import { BaseAmount } from "@xchainjs/xchain-util";
import * as Bitcoin from "bitcoinjs-lib";
import { BuildTxResult, UTXO } from "./types/utxos";

let coinSelect = require("coinselect");
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export default class BTCTxClient extends BTCUtxosClient {
  constructor(network: NetworkType) {
    super(network);
  }

  async broadcastTx(txHex: string, haskoinUrl: string): Promise<string> {
    const instance = axios.create();

    const MAX = 5;
    let counter = 0;

    const onFullfilled = (res: AxiosResponse): AxiosResponse => res;
    const onRejected = async (error: AxiosError): Promise<AxiosResponse> => {
      const config = error.config;
      if (counter < MAX && error.response?.status === 500) {
        counter++;
        await delay(200 * counter);
        return instance.request(config);
      }
      return Promise.reject(error);
    };
    // All logic for re-sending same tx is handled by Axios' response interceptor
    // https://github.com/axios/axios#interceptors
    const id = instance.interceptors.response.use(onFullfilled, onRejected);

    const url = `${haskoinUrl}/transactions`;
    try {
      const {
        data: { txid },
      } = await instance.post<string, AxiosResponse<{ txid: string }>>(
        url,
        txHex
      );
      // clean up interceptor from axios instance
      instance.interceptors.response.eject(id);
      return txid;
    } catch (error: unknown) {
      // clean up interceptor from axios instance
      instance.interceptors.response.eject(id);
      return Promise.reject(error);
    }
  }

  async buildTx(
    amount: BaseAmount,
    recipient: string,
    sender: string,
    network: NetworkType,
    sochainUrl: string,
    haskoinUrl: string,
    feeRate: number,
    memo?: string,
    spendPendingUTXO = false, // default: prevent spending uncomfirmed UTXOs
    withTxHex = false,
    walletIndex?: number
  ): Promise<BuildTxResult> {
    const confirmedOnly = !spendPendingUTXO;
    const utxos = await this.scanUTXOs(
      sochainUrl,
      haskoinUrl,
      network,
      sender,
      confirmedOnly,
      withTxHex
    );
    if (utxos.length === 0) throw new Error("No utxos to send");
    if (!utils.validateAddress(recipient, network))
      throw new Error("Invalid address");

    const feeRateWhole = Math.ceil(feeRate);
    const compiledMemo = memo ? utils.compileMemo(memo) : null;

    const targetOutputs = [];
    console.log("Build tx :: ", amount.amount().toNumber());
    //1. add output amount and recipient to targets
    targetOutputs.push({
      address: recipient,
      value: amount.amount().toNumber(),
    });
    //2. add output memo to targets (optional)
    if (compiledMemo) {
      targetOutputs.push({ script: compiledMemo, value: 0 });
    }
    const { inputs, outputs } = coinSelect(utxos, targetOutputs, feeRateWhole);

    // .inputs and .outputs will be undefined if no solution was found
    if (!inputs || !outputs)
      throw new Error("Insufficient Balance for transaction");

    const psbt = new Bitcoin.Psbt({ network: utils.btcNetwork(network) }); // Network-specific

    // psbt add input from accumulative inputs
    inputs.forEach((utxo: UTXO) =>
      psbt.addInput({
        hash: utxo.hash,
        index: utxo.index,
        witnessUtxo: utxo.witnessUtxo,
      })
    );

    // psbt add outputs from accumulative outputs
    outputs.forEach((output: Bitcoin.PsbtTxOutput) => {
      if (!output.address) {
        //an empty address means this is the  change ddress
        output.address = sender;
      }
      if (!output.script) {
        psbt.addOutput(output);
      } else {
        //we need to add the compiled memo this way to
        //avoid dust error tx when accumulating memo output with 0 value
        if (compiledMemo) {
          psbt.addOutput({ script: compiledMemo, value: 0 });
        }
      }
    });

    return { psbt, utxos, inputs };
  }
}
