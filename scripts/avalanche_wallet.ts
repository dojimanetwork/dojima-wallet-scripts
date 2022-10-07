import { AvalancheAccount } from "../src/accounts/avalanche_account";
import { AvalancheConnection } from "../src/types/interfaces/avalanche_connection";

async function avalanche(){
    console.log("HI");
    const ava_inst = new AvalancheAccount("testnet","letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn")  
    const address = ava_inst.getAddress()
    const balance = ava_inst.getBalance(address)

}   

(async()=>{
    await avalanche()
})();