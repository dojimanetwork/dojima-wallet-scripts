const { pos } = require('../../config');
const { getPOSClient, from } = require('../../utils');

const execute = async () => {
    const client = await getPOSClient();
    const erc721Token = client.erc721(pos.parent.erc721, true);

    const result = await erc721Token.isApproved('805');

    console.log("isApproved", result);

}
execute().then(() => {
}).catch(err => {
    console.error("err", err);
}).finally(_ => {
    process.exit(0);
})