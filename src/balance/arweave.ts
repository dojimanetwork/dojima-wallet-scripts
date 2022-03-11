import Arweave from "arweave";
import { getKeyFromMnemonic } from "arweave-mnemonic-keys";
import { NetworkType } from "../types/interfaces/network";
import ArweaveInitialise from "../types/interfaces/arweave_initialise";
import Transaction from "arweave/node/lib/transaction";

export class ArweaveChain extends ArweaveInitialise {
  _mnemonic: string;
  constructor(mnemonic: string, network: NetworkType) {
    super(mnemonic, network);
    this._mnemonic = mnemonic;
  }

  async getBalance(arweave: Arweave) {
    const pvtKey = await getKeyFromMnemonic(this._mnemonic);
    // console.log('Pvt key is : ' + pvtKey);
    const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);
    // console.log('Pub Address is : ' + pubAddress);

    // Get balance
    let wnstBalance = await arweave.wallets.getBalance(pubAddress);
    // console.log("Winston balance is : " + wnstBalance);

    // Convert balance from Winston to Ar. (1 Ar = 10^12)
    const arBalance = arweave.ar.winstonToAr(wnstBalance);
    // console.log("Ar balance is : " + arBalance);

    return arBalance;
  }

  // Create transaction based on user inputs
  async createTransaction(toAddress: string, amount: number, arweave: Arweave) {
    const pvtKey = await getKeyFromMnemonic(this._mnemonic);
    // const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);
    // console.log('Pub Address is : ' + pubAddress);

    // Create transaction
    const rawTx = await arweave.createTransaction(
      {
        target: toAddress, // Receiver address
        quantity: arweave.ar.arToWinston(amount.toString()), // Amount to transfer in Ar
      },
      pvtKey
    );

    return rawTx;
  }

  // Calculate gasFee required for transaction
  getGasFee(rawTx: Transaction) {
    // Gas fee generated by default during 'createTransaction'
    const gasFee = rawTx.reward;
    return {
      slow: {
        fee: gasFee,
      },
      average: {
        fee: gasFee,
      },
      fast: {
        fee: gasFee,
      },
    };
  }

  // Sign and Send the transaction
  async signAndSend(rawTx: Transaction, arweave: Arweave) {
    const pvtKey = await getKeyFromMnemonic(this._mnemonic);
    // const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);

    // Sign transaction and retreive status
    await arweave.transactions.sign(rawTx, pvtKey);
    const status = await arweave.transactions.post(rawTx);
    await arweave.api.get("/mine");
    // console.log("transfer status", status);

    if (status.status == 200) {
      // console.log('Transaction Hash / Id is : ' + transaction.id);
      // Get status data using transaction hash / id
      const statusData = await arweave.transactions.getStatus(rawTx.id);

      // console.log(JSON.stringify(statusData));

      return rawTx.id;
    } else {
      console.log(
        "Error in status: Posting the transaction into arweave transactions"
      );
    }
  }

  // async createTransactionAndSend(toAddress: string, amount: number, arweave: Arweave) {
  //     const pvtKey = await getKeyFromMnemonic(this._mnemonic);
  //     // const pubAddress = await this._arweave.wallets.jwkToAddress(pvtKey);
  //     // console.log('Pub Address is : ' + pubAddress);

  //     // Create transaction
  //     const transaction = await arweave.createTransaction({
  //         target: toAddress,                              // Receiver address
  //         quantity: arweave.ar.arToWinston(amount.toString())  // Amount to transfer in Ar
  //     }, pvtKey);

  //     console.log("Reward amount", transaction.reward);

  //     // Sign transaction and retreive status
  //     await arweave.transactions.sign(transaction, pvtKey)
  //     const status = await arweave.transactions.post(transaction)
  //     await arweave.api.get("/mine")
  //     // console.log("transfer status", status);

  //     if (status.status == 200) {
  //         // console.log('Transaction Hash / Id is : ' + transaction.id);
  //         // Get status data using transaction hash / id
  //         const statusData = await arweave.transactions.getStatus(transaction.id);

  //         // console.log(JSON.stringify(statusData));

  //         return {
  //             transaction,
  //             statusData
  //         }

  //     } else {
  //         console.log('Error in status');
  //     }
  // }
}
