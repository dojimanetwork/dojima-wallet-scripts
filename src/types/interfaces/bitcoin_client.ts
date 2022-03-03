import { Client } from '@xchainjs/xchain-bitcoin';
import { Network } from '@xchainjs/xchain-client';
import { NetworkType } from './network';

export default class BitcoinClient {
    _network: string;
    _mnemonic: string;
    constructor(mnemonic: string, network: NetworkType) {
        this._mnemonic = mnemonic;
        this._network = network;
    }

    init() {
        const client = new Client({phrase: this._mnemonic});
        // Default 'network' is 'testnet' in Xchainjs Client
        if(this._network === 'mainnet'){
            client.setNetwork(Network.Mainnet);
        } else if(this._network === 'devnet'){
            client.setNetwork(Network.Stagenet);
        }

        return client;
    }
}