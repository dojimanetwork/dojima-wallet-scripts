import { ApiPromise } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { KeyringPair } from '@polkadot/keyring/types';
import '@polkadot/api-augment';
import { PolkadotApi } from '../types/interfaces/polkadot_api';
import { NetworkType } from '../types/interfaces/network';

export class PolkadotChain extends PolkadotApi {
  _mnemonic: string;
  _account: KeyringPair;

  constructor(mnemonic: string, network: NetworkType) {
    super(network);

    this._mnemonic = mnemonic;
    // Constuct the keyring after the API
    const keyring = new Keyring({ type: 'sr25519' });
    // const keyring = new Keyring();  // default { type: 'ed25519' }

    // User Account
    this._account = keyring.addFromMnemonic(this._mnemonic);
    // console.log('Address : ', this._account.address);

  }

  async getBalance(api: ApiPromise) {
    let balance = (await api.derive.balances.all(this._account.address)).availableBalance.toNumber();
    balance = balance / Math.pow(10, 12);
    // console.log(balance);
    return balance;
  }

  async createTransactionAndSend(toAddress: string, amount: number, api: ApiPromise) {
    const toAmount = amount * Math.pow(10, 12);
    // console.log('To Amount : ' , toAmount);
    const { nonce: nonce } = await api.query.system.account(this._account.address);
    // console.log('Nonce : ', nonce);

    // Create transaction
    const transferDetails = api.tx.balances.transfer(toAddress, toAmount);

    // Add signature for transaction
    const signer = api.createType('SignerPayload', {
      method: transferDetails,
      nonce: nonce.toHex(),
      runtimeVersion: api.runtimeVersion,
      genesisHash: api.genesisHash,
      blockHash: api.genesisHash
    }, { version: api.extrinsicVersion });
    // console.log('Signer : ', signer);

    const { signature } = api.createType('ExtrinsicPayload', signer.toPayload(), { version: api.extrinsicVersion }).sign(this._account);
    // console.log('Signature is : ', signature);

    transferDetails.addSignature(this._account.address, signature, signer.toPayload());

    try {
      const transactionDetails = await transferDetails.send();
      // console.log('Transaction details : ', transactionDetails);
      return transactionDetails;
    } catch (error) {
      console.log('Error : ' + error);
    }
  }
}
