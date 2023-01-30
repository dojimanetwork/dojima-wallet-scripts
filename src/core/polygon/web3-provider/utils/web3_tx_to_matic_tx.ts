import { ITransactionData } from "../../src-client";
import { Transaction } from "web3/eth/types";

export const web3TxToMaticTx = (tx: Transaction) => {
    const maticTx: ITransactionData = tx as any;
    maticTx.transactionHash = tx.hash;
    return maticTx;
};