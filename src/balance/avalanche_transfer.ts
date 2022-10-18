import { FeeOption, TxParams } from "@xchainjs/xchain-client";
import { assetToBase, assetAmount, Asset, Chain,baseToAsset } from "@xchainjs/xchain-util";
import { AvalancheAccount } from "../accounts/avalanche_account";
import { NetworkType } from "../types/interfaces/network";

export class AvalancheTransfer extends AvalancheAccount{
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
    };

   async transfer(amount:number,recepient:string){
       let finalamount = assetToBase(assetAmount(amount, 18))
       let to = recepient
        const txid = await this._client.transfer({ 
            "asset": this.assetRIP,
            "amount": finalamount,
            "recipient":to,
            feeOption: FeeOption.Average,
        })
        console.log(`Transaction sent: ${txid}`)
    }
    assetRIP: Asset = {
        chain: Chain.Avalanche,
        symbol: "AVAX",
        ticker: "AVAX",
        synth: false,
      }

    async gasFee(amount:number,recepient:string) {
        let to = recepient;
        let amountToTransfer = assetToBase(assetAmount(amount, 18));
        try {
            const txParams: TxParams = {
                walletIndex: 0,
                asset: this.assetRIP,
                amount: amountToTransfer,
                recipient: to,
            }
            const {fast, fastest, average} = await this._client.getFees(txParams)
            console.log(`Fees Fast: ${baseToAsset(fast).amount()} Fastest: ${baseToAsset(fastest).amount()} Average: ${baseToAsset(average).amount()}`)    } catch (error) {
            console.log(`Caught: ${error}`)
        }
        
    }
}