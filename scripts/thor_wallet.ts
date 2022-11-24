import ThorClient from "../src/types/interfaces/thor_client";

async function checkThor() {
    const phrase =
        // "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
        "pipe expire lecture state pilot latin stamp senior market much dilemma tooth airport oblige flower caught risk canoe radar gadget tag narrow inch trust";

    const thorClient = new ThorClient(phrase, "testnet");
    const address = thorClient.getAddress();
    console.log("Address :: ", address);
    // const bal = await thorClient.getBalance(
    //     "dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje"
    // );
    // console.log("Balance :: ", bal);
    // const data = await thorClient.getTxData("A9F5A06C5817D771A4C5B222D992D493DA13911A9C4F654EC685A5044A480249");
    // console.log("Tx data : ", data);
    // const fees = await thorClient.getGasFee();
    // console.log("Fees : ", fees.fastest.amount().toNumber());
    // const txs = await thorClient.getTxsHistory("dojima1ek92jm68wkwv9zvjwn5gdgnt3vu4na3h5k5uje");
    // console.log("Txs : ", txs);
    // const hash = await thorClient.transfer(0.1, 'dojima15ca4lmfe9u6cc5x0cmqmw2wkvh6l4xdpr908km');
    // console.log("Tx hash : ", hash);
}

(async () => {
    await checkThor();
})();