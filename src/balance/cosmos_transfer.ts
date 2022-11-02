import { CosmosSDKClient, COSMOS_DECIMAL, getDefaultRootDerivationPaths } from "@xchainjs/xchain-cosmos";
import { assetToBase, assetAmount, AssetAtom } from "@xchainjs/xchain-util";
import { CosmosConnection } from "../types/interfaces/cosmos_connection";
import { NetworkType } from "../types/interfaces/network";
import { cosmosclient, proto, rest } from '@cosmos-client/core'
import { times } from "lodash";


export class CosmosTransfer extends CosmosConnection{
    [x: string]: any;
    _cosmosTransfer:CosmosSDKClient
    chainId:string;
    server:string;

    constructor(network:NetworkType,mnemonic:string,rootDerivationPaths = getDefaultRootDerivationPaths(),){
        super(network,mnemonic);
        
        if(network === "testnet" || network === "devnet"){
            this.server = "http://lcd.gaia.bigdipper.live:1317";
            this.chainId = "gaia-3a";
        }
        else{
            this.server = "https://api.cosmos.network";
            this.chainId = "cosmoshub-3";
        }
        this._cosmosTransfer = new CosmosSDKClient({server:this.server,chainId:this.chainId});
    }

    private getPrivateKey(index = 0,mnemonic): proto.cosmos.crypto.secp256k1.PrivKey {
        if (mnemonic) throw new Error('Phrase not set')
    
        return this.getSDKClient().getPrivKeyFromMnemonic(mnemonic, this.getFullDerivationPath(index))
      }
    
    //   getSDKClient(): CosmosSDKClient {
    //     return this._cosmosTransfer
    //   }

   
}

    // async transfer(amount:number,recipient:string,memo?:string,){
    //     let finalAmount = assetToBase(assetAmount(amount, COSMOS_DECIMAL));
    //     let feeRate = await this._client.getFeeRates()

    //     try {
    //         const txid = await this._client.transfer({
    //             "amount": finalAmount,
    //             "recipient": recipient,
    //             "memo": "test",
    //             "asset": AssetAtom,

    //         })
    //         console.log(`Transaction sent: ${JSON.stringify(txid)}`)
    //     } catch (error) {
    //         console.log(`Caught ${error}`)
    //     }
    // }