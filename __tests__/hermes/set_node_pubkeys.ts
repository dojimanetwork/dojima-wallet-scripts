import {
    DOJ_DECIMAL,
    HermesSdkClient
} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {
    assetAmount,
    assetToBase
} from "../../src/core/utils";

async function checkHermes() {
    const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn"; // dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58
        "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut" // dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km

    const hermesClient = new HermesSdkClient({phrase, network: Network.DojTestnet});
    let amount = assetToBase(assetAmount(1, DOJ_DECIMAL ))
    const depositHash = await hermesClient.deposit({amount, memo: `BOND:dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km`})
    console.log('Bond Deposit tx hash :: ', depositHash)

    await delay(5000); 

    const setPubkeysHash = await hermesClient.setPubkeys({secp256k1Pubkey:"dojimapub1addwnpepqf9eve9a9d5xlvvhlf5mjhan2gu9hk4ptch2asmwun6y43w6a47wqgqjd9f", ed25519Pubkey: "dojimapub1zcjduepqlhhrvk0prz4mnr6u57fhrdu38tvs8jlj057mdfa5gmyf5vkj2qes6jxded", validatorConsPubkey: "dojimacpub1zcjduepqp9exmu3hdqs0u7mkvska92ck8rmwefgkgfkr3rpttwrsce7c7lgs48y02k"})
    console.log('Set Version tx hash :: ', setPubkeysHash)
}

(async () => {
    await checkHermes();
})();