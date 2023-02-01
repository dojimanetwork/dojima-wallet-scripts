import {ArweaveClient} from "../../src/core/arweave";
import {Network} from "../../src/core/client";

async function checkArweave() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    /** for DojTestnet pass
     config : {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
    }
     */
    const arClient = new ArweaveClient({
        phrase,
        network: Network.DojTestnet,
        config: {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
        }
    });
    const inboundAddress = await arClient.getArweaveInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const bnbswapHash = await arClient.swap(3,'BNB.BNB', inboundAddress, 'tbnb1a7h84x4zur6ewqaj6fym9hej8xljkzwe82vgsu')
    console.log('BNB Swap tx hash : ', bnbswapHash)
    const d11kswapHash = await arClient.swap(0.1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('D11K Swap tx hash : ', d11kswapHash)
    const dotswapHash = await arClient.swap(3,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    console.log('DOT Swap tx hash : ', dotswapHash)
    const ethswapHash = await arClient.swap(3,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    console.log('ETH Swap tx hash : ', ethswapHash)
    const solswapHash = await arClient.swap(3,'SOL.SOL', inboundAddress, 'DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS')
    console.log('SOL Swap tx hash : ', solswapHash)
}

(async () => {
    await checkArweave();
})();