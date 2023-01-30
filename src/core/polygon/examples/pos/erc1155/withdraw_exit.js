const { pos } = require('../../config');
const { getPOSClient } = require('../../utils');

const execute = async () => {
  const client = await getPOSClient();
  const erc1155Token = client.erc1155(pos.parent.erc1155, true);

  const result = await erc1155Token.withdrawExit('0x5af57b56e6cee0866c0331fb3867bc4e8253ab2a020ac66a41de50e8791a0314');

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