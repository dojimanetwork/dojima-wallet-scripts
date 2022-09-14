import BinanceAccount from "../src/accounts/binance_account";
// import connectWallet from "../src/types/interfaces/binance_connections";
// import connectWallet from "../src/types/interfaces/binance_connections";


async function binance_connections_test(){
    console.log("hi");
    const binance_inst = new BinanceAccount();
    const mnemonic="female hidden they what snack exist become vast method law moon decrease"
    const address = await binance_inst.getAddress(mnemonic)
    const balance = await binance_inst.getBalance(address.address);
    // const txhash = await binance_inst.transfer(0.1,"tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va",mnemonic,"BNB","hi")
    // const txdata = await binance_inst.getTx(txhash.result[0].hash)
    await binance_inst.getTranscations({address: address.address,limit:5})
    await binance_inst.getTxData("F6B9FB62701600148E07570978019876BFF9D64DA4540082214FC50F56062E1A")
    console.log(address);
    // console.log("tbnb1w4apnl25avlefrvfkxvs0nq72t23sp27jk89va")
    console.log("balance - ",balance);
    // console.log(txhash)

    // console.log(txdata)
    // connectWallet()
    
}

(async () => {
     await binance_connections_test();
  })();
