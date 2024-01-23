import {DOJ_DECIMAL, HermesSdkClient} from "../../src/core/hermes";
import {Network} from "../../src/core/client";
import {assetAmount, AssetDOJNative, assetToBase, baseToAsset} from "../../src/core/utils";
import {getNodeProviderDetails} from "../investor/nodeApi";
import {NodeAddressObject} from "../investor/types";

const phrase = "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
const public_address = "tdojima1dthjqgqld5zwryug7d9kg2kwal4tugwm0l4p2y";

const phrase_2 = "message nut rain immune rifle fall legend floor cradle spin season sting couch age swap seminar melt cable life battle island impose cradle brass";
const public_address_2 = "tdojima1mcle7k7nyvtjvhe2mn5686mfc7vupz4gcq6rgk";

const phrase_3 = "wink umbrella toss bleak patient extend palm asthma divorce quit track planet depend tenant mimic shiver girl segment lend unit body account monster lizard";
const public_address_3 = "tdojima1v4qznsctumvc4hygg9tqjsx242tglgw4csn5qf";

// const node_phrase = "taxi act animal room trip column action real abstract kit acoustic rigid army jump drink merit over cupboard flat wasp clown ugly wealth coconut";
// const node_address = "tdojima1semkpr46vgz7n27rahnwa69vwmvkhkp74e9nnh";
const node_address = "tdojima1mcle7k7nyvtjvhe2mn5686mfc7vupz4gcq6rgk";
// const wrong_node_address = "tdojima1dthjqgqld5zwryug7d9kg2kwal4tugwm0l4p2t";

// const vault_address = "tdojima1f9m47j2w2ty0lyksmku2sffcyp8376e8r96ps3";

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

    const hermesClient_3 = new HermesSdkClient({
        phrase: phrase_3,
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
        const nodeObject = await getNodeProviderDetails(node_address);

        const nodeOperatorFee = nodeObject.bond_providers.node_operator_fee;

        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        const addWhitelistAddressHash = await hermesClient_2.deposit({amount: baseAmt, memo: `BOND:${node_address}:${public_address_3}:${nodeOperatorFee}`});
        expect(addWhitelistAddressHash).toBeTruthy();
    });

    it('Bond to node address from whitelist address', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);

        const baseAmt = assetToBase(assetAmount(10, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address_3)).toBe(true);
        const addBondFromWhitelistedAddressHash = await hermesClient_3.deposit({
            amount: baseAmt,
            memo: `BOND:${node_address}`
        });
        expect(addBondFromWhitelistedAddressHash).toBeTruthy();
    });

    it('Unbond from node address to whitelist address', async () => {
        const nodeObject = await getNodeProviderDetails(node_address);
        const unbondAmount = 5 * Math.pow(10, 8);
        const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL ));
        expect(isAddressInProviders(nodeObject, public_address_3)).toBe(true);
        // expect(isNodeActive(nodeObject)).toBe(true);
        const removeBondByWhitelistedAddressHash = await hermesClient_3.deposit({
            amount: baseAmt,
            memo: `UNBOND:${node_address}:${unbondAmount}`
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
});