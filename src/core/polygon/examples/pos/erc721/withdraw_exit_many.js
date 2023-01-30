const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const erc721Token = client.erc721(pos.parent.erc721, true);

  const result = await erc721Token.withdrawExitMany('0x54f47c891b460369661e22e27eeb4afbbb5dd792c7c8b48cab758892c14ffe85');

  const txHash = await result.getTransactionHash();
  console.log("txHash", txHash);
  const receipt = await result.getReceipt();
  console.log("receipt", receipt);

}
execute().then(() => {
}).catch(err => {
  console.error("err", err);
}).finally(_ => {
  process.exit(0);
})