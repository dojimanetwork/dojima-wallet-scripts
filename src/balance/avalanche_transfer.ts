import { FeeOption, TxParams } from "@xchainjs/xchain-client";
import { assetToBase, assetAmount, Asset, Chain,baseToAsset } from "@xchainjs/xchain-util";
import axios from "axios";
import { AvalancheAccount } from "../accounts/avalanche_account";
import { NetworkType } from "../types/interfaces/network";

export class AvalancheTransfer extends AvalancheAccount{
    assetRip:Asset
    constructor(network:NetworkType,mnemonic:string){
        super(network,mnemonic);
         this.assetRip  = {
            chain: Chain.Avalanche,
            symbol: "AVAX",
            ticker: "AVAX",
            synth: false,
          }
    
    };

   async transfer(amount:number,recepient:string){

       let finalamount = assetToBase(assetAmount(amount, 18))
       let to = recepient
        const txid = await this._client.transfer({ 
            "asset": this.assetRip,
            "amount": finalamount,
            "recipient":to,
            feeOption: FeeOption.Average,
        })
        console.log(`Transaction sent: ${txid}`)
    }
    
    async gasFee(amount:number,recepient:string) {
        let to = recepient;
        let amountToTransfer = assetToBase(assetAmount(amount, 18));
        try {
            let gas = "https://api.owlracle.info/v3/avax/gas";
        const response = await axios.get(gas);
        console.log(response.data)
        const gasFee =  response.data.speeds[0].estimatedFee ;
        console.log(gasFee)
        const baseFee = response.data.speeds[0].baseFee ;
        console.log("base - " ,baseFee);
        const maxPFee = response.data.speeds[0].maxPriorityFeePerGas
        console.log("max - ",maxPFee);
        const maxFeePerGas =  (baseFee + maxPFee);
        console.log(maxFeePerGas)
        }
        catch(error){
            console.log("error")
        }

    }
}

// import ethers from "ethers";
// import { Avalanche } from "avalanche";
// import { EVMAPI } from "avalanche/dist/apis/evm";
// import { AvalancheAccount } from "../accounts/avalanche_account";
// import { NetworkType } from "../types/interfaces/network";

// export class  AvalancheTransfer extends AvalancheAccount{
//  chainId = 43113
//  cchain: EVMAPI 
//     constructor(network:NetworkType,mnemonic:string) {
//         super(network,mnemonic);
//         const avalanche :Avalanche= new Avalanche(
//             "api.avax-test.network",
//             undefined,
//             "https",
//             this.chainId
//         )
//         this.cchain = avalanche.CChain()
//     }
//     async transfer() {
//         // For sending a signed transaction to the network
//         const nodeURL = "https://api.avax-test.network/ext/bc/C/rpc";
//         const HTTPSProvider = new ethers.providers.JsonRpcProvider(nodeURL);

//         const calcFeeData = async (
//             maxFeePerGas = 0,
//             maxPriorityFeePerGas = 0
//           ) => {
//             const baseFee = parseInt(await this.cchain.getBaseFee(), 16) / 1e9
//             console.log(baseFee)
//             maxPriorityFeePerGas =
//               maxPriorityFeePerGas == undefined
//                 ? parseInt(await this.cchain.getMaxPriorityFeePerGas(), 16) / 1e9
//                 : maxPriorityFeePerGas
//             maxFeePerGas =
//               maxFeePerGas == undefined ? baseFee + maxPriorityFeePerGas : maxFeePerGas
//             console.log("-",maxFeePerGas)
//             if (maxFeePerGas < maxPriorityFeePerGas) {
//               throw "Error: Max fee per gas cannot be less than max priority fee per gas"
//             }
          
//             return {
//               maxFeePerGas: maxFeePerGas.toString(),
//               maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
//             }
//           }
       
//           console.log(calcFeeData());
//     }

    
// }