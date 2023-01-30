import { getPOSClient, to } from '../../src/core/matic'
import config from '../../src/core/matic/config.json'

async function transferErc20() {
    // const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
    const client = await getPOSClient();
    const erc20Token = client.erc20(config.pos.parent.erc20, true);

    const result = await erc20Token.transfer(0.1, to);

    const txHash = await result.getTransactionHash();
    console.log("txHash", txHash);
    const receipt = await result.getReceipt();
    console.log("receipt", receipt);
}

(async () => {
    await transferErc20();
})();