import {DOJ_DECIMAL, HermesSdkClient} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {assetAmount, AssetDOJNative, assetToBase, baseToAsset} from "../../src/core/utils";
import {getNodeProviderDetails} from "../investor/nodeApi";
import {NodeAddressObject} from "../investor/types";

const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
const public_address = "tdojima18ac9lhy3cucpwjjtlgvyr8rpgxe5v8sr2ssn6k";

const phrase_2 = "message nut rain immune rifle fall legend floor cradle spin season sting couch age swap seminar melt cable life battle island impose cradle brass";
const public_address_2 = "tdojima1mcle7k7nyvtjvhe2mn5686mfc7vupz4gcq6rgk";

// const phrase_3 = "wink umbrella toss bleak patient extend palm asthma divorce quit track planet depend tenant mimic shiver girl segment lend unit body account monster lizard";
// const public_address_3 = "tdojima1v4qznsctumvc4hygg9tqjsx242tglgw4csn5qf";

const phrase_4 = "obvious august river model legend pipe little fossil chase chicken good math lake dash wage trim tenant ramp absorb soon network piece boil during";
// const public_address_4 = "tdojima10332e7pfldstrvykp830mk5r3tf3ujq5njsann";

// const cat_phrase = "cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat cat crawl";
// const cat_public_address = "tdojima1ga5jggejjsefnwas9yaxxnfp5apc73psp98z2q";

// const fox_phrase = "fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox fox filter";
// const fox_public_address = "tdojima1lsun66ej4zl8sgpl4h9a7z8u5l3zcvrzmkh6x4";

const dog_phrase = "soda surprise only person trial fruit purpose era dolphin clean segment viable vivid cushion frown online approve south quiz nose poverty action wing update";
const dog_public_address = "tdojima1s9yrj8hnqmprz98639ngkea6znk4mh6vvsr4vt";

// const node_phrase = "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut";
// const node_address = "tdojima1semkpr46vgz7n27rahnwa69vwmvkhkp74e9nnh";
const node_address = "tdojima1mcle7k7nyvtjvhe2mn5686mfc7vupz4gcq6rgk";
const node_address_1 = "tdojima10332e7pfldstrvykp830mk5r3tf3ujq5njsann";
// const wrong_node_address = "tdojima1dthjqgqld5zwryug7d9kg2kwal4tugwm0l4p2t";

// const vault_address = "tdojima1f9m47j2w2ty0lyksmku2sffcyp8376e8r96ps3";

const node_address_test = "dojima1nh4y3gqxsn7ymm9t45zwsz3h8p9tm7pev8my62";
const node_phrase_test = "wink umbrella toss bleak patient extend palm asthma divorce quit track planet depend tenant mimic shiver girl segment lend unit body account monster lizard";
const whitelist_phrase_test = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
const whitelist_address_test = "dojima1agwwyxg98x0smujpxnl63t45uua3yj4qrv5j58";

function isAddressInProviders(nodeAddressObject: NodeAddressObject, bondAddress: string): boolean {
    if (nodeAddressObject.bond_providers && nodeAddressObject.bond_providers.providers) {
        // Check if the targetAddress is present in any provider's bond_address
        return nodeAddressObject.bond_providers.providers.some(provider => provider.bond_address === bondAddress);
    }
    return false;
}

function isNodeActive(nodeAddressObject: NodeAddressObject): boolean {
    return nodeAddressObject.status === "Active";
}

function isNodeDisabled(nodeAddressObject: NodeAddressObject): boolean {
    return nodeAddressObject.status === "Disabled";
}

describe('check investor functions', () => {
    const hermesClient = new HermesSdkClient({
        phrase: phrase,
        network: Network.Testnet
    });

    const hermesClient_2 = new HermesSdkClient({
        phrase: phrase_2,
        network: Network.Testnet
    });

    // const hermesClient_3 = new HermesSdkClient({
    //     phrase: phrase_3,
    //     network: Network.Testnet
    // });

    const hermesClient_4 = new HermesSdkClient({
        phrase: phrase_4,
        network: Network.Testnet
    });

    const hermesClient_dog = new HermesSdkClient({
        phrase: dog_phrase,
        network: Network.Testnet
    });

    // const hermesClient_fox = new HermesSdkClient({
    //     phrase: fox_phrase,
    //     network: Network.Testnet
    // });

    const hermesClient_node_test = new HermesSdkClient({
        phrase: node_phrase_test,
        network: Network.Testnet
    });

    const hermesClient_whitelist_test = new HermesSdkClient({
        phrase: whitelist_phrase_test,
        network: Network.Testnet
    });

    it('checks if address is correct', () => {
        const address = hermesClient.getAddress();
        expect(address).toBe(public_address_2);
    });

    it('checks if address_2 is correct', () => {
        const address = hermesClient_2.getAddress();
        expect(address).toBe(public_address_2);
    });

    it('checks if balance is greater than or equal to zero', async () => {
        const address = hermesClient.getAddress();
        const bal = await hermesClient.getBalance(
            address,
            [AssetDOJNative]
        );
        // console.log(bal)
        const balance = ((baseToAsset(bal[0].amount)).amount()).toNumber();
        expect(balance).toBeGreaterThanOrEqual(0);
    });

    it('checks if balance_2 is greater than or equal to zero', async () => {
        const address = hermesClient_2.getAddress();
        const bal = await hermesClient_2.getBalance(
            address,
            [AssetDOJNative]
        );
        // console.log(bal)
        const balance = ((baseToAsset(bal[0].amount)).amount()).toNumber();
        expect(balance).toBeGreaterThanOrEqual(0);
    });

    it('checks if node is valid', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);
        expect(nodeObject.node_address).toBe(node_address);
        expect(nodeObject).toBeTruthy();
    });

    it('checks if node is not valid', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);
        expect(nodeObject).toBeNull();
    });

    it('checks if bond_address is whitelisted or not', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);

        expect(nodeObject.node_address).toBe(node_address);

        expect(isAddressInProviders(nodeObject, public_address)).toBe(true);
    });

    it('checks if bond_address_2 is whitelisted or not', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);

        expect(nodeObject.node_address).toBe(node_address);

        expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
    });

    it('Add bond_address to whitelist', async () => {
        // const nodeObject = await getNodeProviderDetails(dog_public_address);
        //
        // const nodeOperatorFee = nodeObject.bond_providers.node_operator_fee;

        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        const addWhitelistAddressHash = await hermesClient_dog.deposit({amount: baseAmt, memo: `BOND:${dog_public_address}:${public_address}:2000`});
        expect(addWhitelistAddressHash).toBeTruthy();
    });

    it('Bond to node address from whitelist address', async () => {
        const nodeObject = await getNodeProviderDetails(dog_public_address);

        const baseAmt = assetToBase(assetAmount(500, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address)).toBe(true);
        const addBondFromWhitelistedAddressHash = await hermesClient.deposit({
            amount: baseAmt,
            memo: `BOND:${dog_public_address}`
        });
        expect(addBondFromWhitelistedAddressHash).toBeTruthy();
    });

    it('Unbond from node address to whitelist address', async () => {
        const nodeObject = await getNodeProviderDetails(dog_public_address);
        const unbondAmount = 200 * Math.pow(10, 8);
        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address)).toBe(true);
        // expect(isNodeActive(nodeObject)).toBe(true);
        const removeBondByWhitelistedAddressHash = await hermesClient.deposit({
            amount: baseAmt,
            memo: `UNBOND:${dog_public_address}:${unbondAmount}`
        });
        expect(removeBondByWhitelistedAddressHash).toBeTruthy();
    });

    it('Leave the nodes by sending to vault address', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);
        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        expect(isNodeActive(nodeObject)).toBe(true);
        const leaveNodeByValutAddressHash = await hermesClient_2.deposit({
            amount: baseAmt,
            memo: `LEAVE:${node_address}`
        });
        expect(leaveNodeByValutAddressHash).toBeTruthy();
    });

    it('Leave the nodes after node is DISABLED to return bond', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);
        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        expect(isNodeDisabled(nodeObject)).toBe(true);
        const leaveNodeAfterDisabledToReturnBondHash = await hermesClient_2.deposit({
            amount: baseAmt,
            memo: `LEAVE:${node_address}`
        });
        expect(leaveNodeAfterDisabledToReturnBondHash).toBeTruthy();
    });

    it('Leave the cat nodes by sending to vault address', async () => {
        // const nodeObject = await getNodeProviderDetails(node_address_1);
        const baseAmt = assetToBase(assetAmount(5, DOJ_DECIMAL ));
        // expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        // expect(isNodeActive(nodeObject)).toBe(true);
        const leaveNodeByValutAddressHash = await hermesClient_4.deposit({
            amount: baseAmt,
            memo: `LEAVE:${node_address_1}`
        });
        expect(leaveNodeByValutAddressHash).toBeTruthy();
    });

    it('Leave the cat nodes after node is DISABLED to return bond', async () => {
        const nodeObject = await getNodeProviderDetails(node_address_1);
        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        // expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        expect(isNodeDisabled(nodeObject)).toBe(true);
        const leaveNodeAfterDisabledToReturnBondHash = await hermesClient_4.deposit({
            amount: baseAmt,
            memo: `LEAVE:${node_address_1}`
        });
        expect(leaveNodeAfterDisabledToReturnBondHash).toBeTruthy();
    });

    it('Leave the dog nodes by sending to vault address', async () => {
        // const nodeObject = await getNodeProviderDetails(node_address_1);
        const baseAmt = assetToBase(assetAmount(100, DOJ_DECIMAL ));
        // expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        // expect(isNodeActive(nodeObject)).toBe(true);
        const leaveNodeByValutAddressHash = await hermesClient_dog.deposit({
            amount: baseAmt,
            memo: `LEAVE:${dog_public_address}`
        });
        expect(leaveNodeByValutAddressHash).toBeTruthy();
    });

    it('Leave the dog nodes after node is DISABLED to return bond', async () => {
        const nodeObject = await getNodeProviderDetails(dog_public_address);
        const baseAmt = assetToBase(assetAmount(100, DOJ_DECIMAL ));
        // expect(isAddressInProviders(nodeObject, public_address_2)).toBe(true);
        expect(isNodeDisabled(nodeObject)).toBe(true);
        const leaveNodeAfterDisabledToReturnBondHash = await hermesClient_dog.deposit({
            amount: baseAmt,
            memo: `LEAVE:${dog_public_address}`
        });
        expect(leaveNodeAfterDisabledToReturnBondHash).toBeTruthy();
    });


    it('Add new_bond_address to whitelist', async () => {
        const nodeObject = await getNodeProviderDetails(node_address_test);

        const nodeOperatorFee = nodeObject.bond_providers.node_operator_fee;

        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        const addWhitelistAddressHash = await hermesClient_node_test.deposit({amount: baseAmt, memo: `BOND:${node_address_test}:${whitelist_address_test}:${nodeOperatorFee}`});
        expect(addWhitelistAddressHash).toBeTruthy();
    });

    it('Bond to node address from new_whitelist address', async () => {
        const nodeObject = await getNodeProviderDetails(node_address_test);

        const baseAmt = assetToBase(assetAmount(100, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, whitelist_address_test)).toBe(true);
        const addBondFromWhitelistedAddressHash = await hermesClient_whitelist_test.deposit({
            amount: baseAmt,
            memo: `BOND:${node_address_test}`
        });
        expect(addBondFromWhitelistedAddressHash).toBeTruthy();
    });
});