import { Client } from '@xchainjs/xchain-bitcoin';
import { Network } from '@xchainjs/xchain-client';
import { NetworkType } from './network';

export default class BitcoinClient {
    _network: string;
    _mnemonic: string;
    _client: Client;
    constructor(mnemonic: string, network: NetworkType) {
        this._mnemonic = mnemonic;
        this._network = network;
        this._client = new Client({phrase: this._mnemonic});
        // Default 'network' is 'testnet' in Xchainjs Client
        if(this._network === 'mainnet'){
            this._client.setNetwork(Network.Mainnet);
        } else if(this._network === 'devnet'){
            this._client.setNetwork(Network.Stagenet);
        } else{
            this._client.setNetwork(Network.Testnet);
        }
    }
}