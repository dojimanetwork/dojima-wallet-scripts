import {SolanaClient} from "../src/core/solana";
import {Network} from "@d11k-ts/client";

async function checkSolana() {

    const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";

    const solClient = new SolanaClient({
        phrase,
        network: Network.Stagenet,
        endpoint: 'https://sol-test.h4s.dojima.network:8899'
        // endpoint: 'http://127.0.0.1:8899'
    });
    const address = await solClient.getAddress();
    console.log("Address :: ", address);
    // const requestAirdrop = await solClient.requestSolTokens('https://sol-test.h4s.dojima.network:8899', address)
    // console.log("Airdrop hash :: ", requestAirdrop)
    const bal = await solClient.getBalance(
        "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"
    );
    console.log("Balance :: ", bal);
    const data = await solClient.getTransactionData("32xndDk795Vz2LLP2sjaHz9b6YGeZQxD9c7bAoQcnPS8ASHgLLn6AAttPMqyf8EmnYPaCQvnU3CLdL6WKbqXag5W");
    console.log("Tx data : ", data);
    const fees = await solClient.getFees();
    console.log("Fees : ", fees.fast);
    const txs = await solClient.getTransactionsHistory({address: "DxehLnrWp8iP5ahoG413BD4azVrkgA8Pob4rXco3mpCS"});
    console.log("Txs : ", txs);
    const hash = await solClient.transfer({amount: 0.0001, recipient: 'G9GtD3uJDdpURr9eKogWUQmYqYfYSoqEpESMtzBPVQ1n'});
    console.log("Tx hash : ", hash);
    const provider = await solClient.getProvider()
    console.log('Provider : ', provider)
    const inboundAddress = await solClient.getSolanaInboundAddress();
    console.log('Inbound Address :: ', inboundAddress)
    const LPDefaultGasFee = await solClient.getDefaultLiquidityPoolGasFee();
    console.log('Liquidity pool default gas fee :: ', LPDefaultGasFee)
    const liquidityPoolHash = await solClient.addLiquidityPool(1, inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Liquidity pool hash : ', liquidityPoolHash)
    const d11kswapHash = await solClient.swap(1,'D11K.DOJ', inboundAddress, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km')
    console.log('Swap tx hash : ', d11kswapHash)
    const arswapHash = await solClient.swap(5,'AR.AR', inboundAddress, '7zzxJgYHgDlaURc3xt3wvLITPp6I8oIpYj_yg_xirb4')
    console.log('Swap tx hash : ', arswapHash)
    const ethswapHash = await solClient.swap(2,'ETH.ETH', inboundAddress, '0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    console.log('ETH Swap tx hash : ', ethswapHash)
}

(async () => {
    await checkSolana();
})();