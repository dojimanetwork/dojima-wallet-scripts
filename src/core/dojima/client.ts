import Web3 from "web3";
import { ChainClientParams, Network } from "../client";
import * as ethers from "ethers";
import BigNumber from "bignumber.js";
import { DojTransferParams, DojTxData, GasfeeResult } from "./types";
import { validatePhrase } from "../crypto";
import { defaultDojInfuraRpcUrl } from "./const";
import { InboundAddressResult, SwapAssetList } from "../utils";
import axios from "axios";

export type DojRpcParams = {
  rpcUrl?: string;
  infuraApiKey?: string;
};

export default class DojimaChain {
  protected network: Network;
  protected web3: Web3;
  protected rpcUrl: string;
  protected account: ethers.ethers.Wallet;
  protected phrase = "";

  constructor({
    phrase,
    privateKey,
    network = Network.Mainnet,
    rpcUrl = defaultDojInfuraRpcUrl,
  }: ChainClientParams & DojRpcParams) {
    // Validate that either phrase or privateKey is provided, but not both
    if ((!phrase && !privateKey) || (phrase && privateKey)) {
      throw new Error(
        "Either phrase or privateKey must be provided, but not both"
      );
    }

    this.network = network;
    if (this.network !== Network.Mainnet && rpcUrl === defaultDojInfuraRpcUrl) {
      throw Error(`'rpcUrl' param can't be empty for 'testnet' or 'stagenet'`);
    }

    if (this.network === Network.Mainnet) {
      this.rpcUrl = rpcUrl;
      this.web3 = new Web3(new Web3.providers.HttpProvider(this.rpcUrl));
    } else {
      this.rpcUrl = rpcUrl;
      this.web3 = new Web3(this.rpcUrl);
    }

    // Setup account using either phrase or privateKey
    const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
    if (phrase) {
      if (!validatePhrase(phrase)) {
        throw new Error("Invalid phrase");
      }

      const accountData = ethers.Wallet.fromMnemonic(phrase);
      this.account = new ethers.Wallet(accountData.privateKey).connect(provider);
    } else {
      this.account = new ethers.Wallet(privateKey!).connect(provider);
    }
  }

  getAddress(): string {
    return this.account.address;
  }

  async getBalance(address: string): Promise<number> {
    const gweiBalance = await this.web3.eth.getBalance(address); // Results balance in gwei, 1 doj = 10^9 gwei(1,000,000,000)
    const dojBalance = this.web3.utils.fromWei(gweiBalance);
    return Number(dojBalance);
  }

  calculateDojFee(baseGasFee: number, multiplier: number): number {
    return new BigNumber(baseGasFee)
      .times(new BigNumber(multiplier))
      .toNumber();
  }

  async estimateGasFee(amount: number, memo?: string): Promise<number> {
    return await this.web3.eth.estimateGas({
      from: this.getAddress(),
      to: this.getAddress(),
      value: amount * Math.pow(10, 18),
      data: memo ? this.web3.utils.toHex(memo) : undefined,
    });
  }

  async getFees(amount: number, memo?: string): Promise<GasfeeResult> {
    const estimateGas = await this.estimateGasFee(
      amount,
      memo ? memo : undefined
    );
    return {
      slow: this.calculateDojFee(estimateGas, 1) / Math.pow(10, 9),
      average: this.calculateDojFee(estimateGas, 1.5) / Math.pow(10, 9),
      fast: this.calculateDojFee(estimateGas, 2) / Math.pow(10, 9),
    };
    // const baseGasFee = await this.web3.eth.getGasPrice();
    // const doj_gasFee = {
    //     slow: this.calculateDojFee(parseFloat(baseGasFee), 1) / Math.pow(10, 18),
    //     average: this.calculateDojFee(parseFloat(baseGasFee), 1.5) / Math.pow(10, 18),
    //     fast: this.calculateDojFee(parseFloat(baseGasFee), 2) / Math.pow(10, 18),
    // };
  }

  async transfer(params: DojTransferParams): Promise<string> {
    const transaction = await this.web3.eth.accounts.signTransaction(
      {
        from: this.getAddress(),
        to: params.recipient,
        value: params.amount * Math.pow(10, 18),
        gas: params.fee
          ? params.fee * Math.pow(10, 9)
          : await this.estimateGasFee(
            params.amount,
            params.memo ? params.memo : undefined
          ),
        data: params.memo ? this.web3.utils.toHex(params.memo) : undefined,
      },
      this.account.privateKey
    );

    const transactionResult = await this.web3.eth.sendSignedTransaction(
      transaction.rawTransaction
    );
    return transactionResult.transactionHash;
  }

  async getTransactionData(hash: string): Promise<DojTxData> {
    console.log((await this.estimateGasFee(0.01, undefined)) * 2);
    const data = await this.web3.eth.getTransaction(hash);
    if (data) {
      return {
        transaction_hash: data.hash,
        from: data.from,
        to: data.to,
        amount: Number(data.value) / Math.pow(10, 18),
        gasFee: data.gas / Math.pow(10, 9),
        block_number: data.blockNumber,
        block_hash: data.blockHash,
        gasPrice: data.gasPrice,
        nonce: data.nonce,
      };
    } else {
      throw new Error(`Failed to get transaction data (tx-hash: ${hash})`);
    }
    // const data = await this.web3.eth.getTransactionReceipt(hash);
    // return data
  }

  async getInboundObject(url: string): Promise<InboundAddressResult> {
    const response = await axios.get(`${url}hermeschain/inbound_addresses`);
    if (response.status !== 200) {
      throw new Error(
        `Unable to retrieve inbound addresses. Dojima gateway responded with status ${response.status}.`
      );
    }

    const data: Array<InboundAddressResult> = response.data;
    const inboundObj: InboundAddressResult = data.find(
      (res) => res.chain === "DOJ"
    );
    return inboundObj;
  }

  async getDojimaInboundAddress(url: string): Promise<string> {
    const inboundObj = await this.getInboundObject(url);
    return inboundObj.address;
  }

  //   async dojimaTransfer(amount: number, recipient: string): Promise<string> {
  //     const memo = `dojin:${recipient}`;
  //     const inboundAddress = await this.getInboundObject();
  //     const txHash = await this.transfer({
  //       amount,
  //       recipient: inboundAddress.address,
  //       memo,
  //     });

  //     return txHash;
  //   }

  //   async addLiquidityPool(
  //     amount: number,
  //     inboundAddress: string,
  //     hermesAddress?: string
  //   ): Promise<string> {
  //     const memo = hermesAddress ? `ADD:DOJ.DOJ:${hermesAddress}` : `ADD:DOJ.DOJ`;

  //     const txHash = await this.transfer({
  //       amount,
  //       recipient: inboundAddress,
  //       memo,
  //     });

  //     return txHash;
  //   }

  async transferWithMemo(to: string, amount: number, memo: string) {
    const tx = await this.account.sendTransaction({
      to,
      value: ethers.utils.parseEther(`${amount}`),
      data: ethers.utils.toUtf8Bytes(memo),
    });

    return tx.hash;
  }

  async addLiquidityPool(to: string, amount: number, hermesAddress?: string) {
    const memo = hermesAddress ? `ADD:DOJ.DOJ:${hermesAddress}` : `ADD:DOJ.DOJ`;

    const txHash = await this.transferWithMemo(to, amount, memo);
    return txHash;
  }

  async swap(
    amount: number,
    token: SwapAssetList,
    inboundAddress: string,
    recipient: string
  ): Promise<string> {
    const memo = `SWAP:${token}:${recipient}`;

    const txHash = await this.transferWithMemo(inboundAddress, amount, memo);

    return txHash;
  }
}
