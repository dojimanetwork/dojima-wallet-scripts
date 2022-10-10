import { FeeOption } from "@xchainjs/xchain-client";
import { assetToBase, assetAmount, Asset, Chain } from "@xchainjs/xchain-util";
import { AvalancheAccount } from "../accounts/avalanche_account";
import { NetworkType } from "../types/interfaces/network";

export class AvalancheTransfer extends AvalancheAccount{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    };

   async transfer(amount:number,recepient:string){
    //    const from = this._client.getAddress();
       let finalamount = assetToBase(assetAmount(amount, 18))
       let to = recepient

        const txid = await this._client.transfer({ 
            "asset": this.assetRIP,
            "amount": finalamount,
            "recipient":to,
            feeOption: FeeOption.Fast,
        })
        console.log(`Transaction sent: ${txid}`)
    }
    assetRIP: Asset = {
        chain: Chain.Avalanche,
        symbol: `RIP-0x224695ba2a98e4a096a519b503336e06d9116e48`,
        ticker: `RIP`,
        synth: false,
      }
}