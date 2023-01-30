const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
    const client = await getPOSClient();
    const erc1155Token = client.erc1155(pos.parent.erc1155, true);

    const result = await erc1155Token.isApprovedAll(from);

    console.log("isApprovedAll", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})