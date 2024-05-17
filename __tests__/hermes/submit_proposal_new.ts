import {
    DOJ_DECIMAL,
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {
    assetAmount,
    assetToBase
} from "../../src/core/utils";
import { RegisterDOJContractProposal } from "../../src/core/hermes/types";

async function checkHermes() {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        // "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km
        "message nut rain immune rifle fall legend floor cradle spin season sting couch age swap seminar melt cable life battle island impose cradle brass";

    const hermesClient = new HermesSdkClient({phrase, network: Network.Testnet});
    const registerDOJContractProposal: RegisterDOJContractProposal  = {
        title: 'Register DOJ Contract',
        description: 'Register DOJ Contract',
        register_contract: {
            chainName: 'BNB',
            contract: '0x',
        }
    }

    let amount = assetToBase(assetAmount(1000000, DOJ_DECIMAL ));
    const proposalHash = await hermesClient.submitProposal({
        amount,
        proposal: registerDOJContractProposal,
    })
    console.log('Proposal tx hash :: ', proposalHash)

    await delay(5000); 
}

(async () => {
    await checkHermes();
})();