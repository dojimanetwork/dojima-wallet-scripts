import { ApiPromise, WsProvider } from "@polkadot/api";
import { NetworkType } from "./network";

export class PolkadotApi {
    _rpcUrl: string;
    constructor(network: NetworkType){
        if(network === 'testnet'){
            this._rpcUrl = 'wss://westend-rpc.polkadot.io';
        } else if(network === 'mainnet') {
            this._rpcUrl = 'wss://rpc.polkadot.io';
        }
    }

    wsProvider() {
        const wsProvider = new WsProvider(this._rpcUrl);
        return wsProvider;
    }
    
    async init() {
        const api = new ApiPromise({ provider: this.wsProvider() })
        await api.isReady
        return api;
    }
}
