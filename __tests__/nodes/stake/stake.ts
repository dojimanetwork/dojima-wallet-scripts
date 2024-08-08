import { Network } from "../../../src/core/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../../src/core/hermes";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../../src/core/utils";
import { getTestNodeProviderDetails } from "../nodeDetails/nodeApi";

const phrase =
  "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn";
/** Hermes client */
const hermesClient = new HermesSdkClient({
  phrase,
  // network: Network.Stagenet,
  // apiUrl: "https://api-h4s.dojima.network",
  // rpcUrl: "https://rpc-h4s.dojima.network",
  // network: Network.Testnet,
  // apiUrl: "https://api-test-h4s.dojima.network",
  // rpcUrl: "https://rpc-test-h4s.dojima.network",
  network: Network.Testnet,
  apiUrl: "http://localhost:1317",
  rpcUrl: "http://localhost:26657",
});
const hermesAddress = hermesClient.getAddress();
console.log("H4S address :: ", hermesAddress);

export async function getBal() {
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);
}

export async function addBalToAddress(amount: number, address: string) {
  const baseAmt = assetToBase(assetAmount(amount, DOJ_DECIMAL));
  const addBalAddressHash = await hermesClient.transfer({
    amount: baseAmt,
    recipient: address,
  });
  console.log("Add bal hash : ", addBalAddressHash);
}

export async function addBondToNode(nodeAddress: string, amount: number) {
  const baseAmt = assetToBase(assetAmount(amount, DOJ_DECIMAL));
  const addBondToNodeAddressHash = await hermesClient.deposit({
    amount: baseAmt,
    memo: `BOND:${nodeAddress}`,
  });
  console.log("Bond hash : ", addBondToNodeAddressHash);
}

export async function whitelistBondProviderToNode(nodeAddress: string, whitelistAddress: string) {
  const nodeObject = await getTestNodeProviderDetails(nodeAddress);

  const nodeOperatorFee = nodeObject.bond_providers.node_operator_fee;

  const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL));
  const addWhitelistAddressHash = await hermesClient.deposit({
    amount: baseAmt,
    memo: `BOND:${nodeAddress}:${whitelistAddress}:${nodeOperatorFee}`,
  });
  console.log("Whitelist bond provider hash : ", addWhitelistAddressHash);
}

(async function HermesStake() {
  await getBal();
  await addBalToAddress(15000000, "tdojima14t6secrzag2h8r362nyrmy6mqhyyeauegcgryw");
  // await whitelistBondProviderToNode("tdojima15lvkm2uwgzzspa8rlj2xy9qlk5hl6jjqxq4vq5", "tdojima14t6secrzag2h8r362nyrmy6mqhyyeauegcgryw");
  // await whitelistBondProviderToNode("tdojima19l30qd7tfq0hdmq34tc4na2m67eg0rd93sdf0x", "tdojima14t6secrzag2h8r362nyrmy6mqhyyeauegcgryw");
  // await whitelistBondProviderToNode("tdojima14sl553fh5amyqa7mzxnw87hkc4dshx2lcsldf5", "tdojima14sl553fh5amyqa7mzxnw87hkc4dshx2lcsldf5");
  // await addBondToNode("tdojima15lvkm2uwgzzspa8rlj2xy9qlk5hl6jjqxq4vq5", 25000);
  // await addBondToNode("tdojima19l30qd7tfq0hdmq34tc4na2m67eg0rd93sdf0x", 12500000);
})();
