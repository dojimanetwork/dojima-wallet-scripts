// import { getPOSClient, from } from '../../src/core/matic'
// import config from '../../src/core/matic/config.json'
import { getPosClient } from './client/instance'

async function checkMatic() {
    // const phrase = 'letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn'
    // const client = await getPOSClient();
    // const erc20Token = client.erc20(config.pos.child.erc20);
    //
    // const result = await erc20Token.getBalance(from);
    // // const result = await erc20Token.getBalance('0xe84d601e5d945031129a83e5602be0cc7f182cf3');
    //
    // console.log("result", result);
    const clientInst = await getPosClient();
    const erc20ChildToken = clientInst.erc20('0xfe4F5145f6e09952a5ba9e956ED0C25e3Fa4c7F1');
    const res = await erc20ChildToken.getBalance('0x0577e1E35C4f30cA8379269B7Fd85cBCE7F084f4')
    console.log('Res :: ', res)
    process.exit()
}

(async () => {
    await checkMatic();
})();