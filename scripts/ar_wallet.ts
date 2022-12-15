import {ArweaveClient} from "../src/core/arweave";
import {Network} from "@d11k-ts/client";

async function checkArweave() {
    const phrase =
        "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    /** for testnet pass
    config : {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
    }
     */
    const arClient = new ArweaveClient({
        phrase,
        network: Network.Testnet,
        config: {
            host: "ar-test.h4s.dojima.network",
            protocol: "https",
            timeout: 100000,
        }
    });
    const address = await arClient.getAddress();
    console.log("Address :: ", address);
    await arClient.mintArTokens('7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    const bal = await arClient.getBalance(
        "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"
    );
    console.log("Balance :: ", bal);

    const data = await arClient.getTransactionData("xnwCmS_oyt6u_yYjCD0kPOC8zMHp16wHF0vcY7ORMPg");
    console.log("Tx data : ", data);
    // const pooldata = await arClient.getTransactionData("C8F3Y2n2g5YeCjR7qKJsQ_NiceWflVPXZELBkj1zO3Q");
    // console.log("Tx data : ", pooldata);
    const rawTx = await arClient.createTransaction('UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', 0.5);
    const fees = arClient.getFees(rawTx);
    console.log("Fees : ", fees.fast);
    const txs = await arClient.getTransactionsHistory({address: "7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4"});
    console.log("Txs : ", txs.txs.outer);
    console.log("Txs : ", txs.txs.inner);
    const hash = await arClient.transfer({ recipient: 'UV6NJyujIFMIaL-oD9TK9P3QQlpmov3UFTdMtvY5xbI', amount: 0.5});
    console.log("Tx hash : ", hash);
    const inboundAddress = await arClient.getArweaveInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const LPDefaultGasFee = await arClient.getDefaultLiquidityPoolGasFee();
    console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)
    const liquidityPoolHash = await arClient.addLiquidityPool(20, inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    // const swapHash = await arClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    // console.log('Swap tx hash : ', swapHash)
    const swapHash = await arClient.swap(5,'DOT.DOT', inboundAddress, '5Gq3owRKkXLneUckXUc5UxKugXiqq78b71UQC4uHxcXFPdwH')
    console.log('Swap tx hash : ', swapHash)
}

(async () => {
    await checkArweave();
})();