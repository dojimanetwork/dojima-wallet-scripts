import { Network } from "../../../src/core/client";
import { DOJ_DECIMAL, HermesSdkClient } from "../../../src/core/hermes";
import {
  assetAmount,
  AssetDOJNative,
  assetToBase,
  baseToAsset,
} from "../../../src/core/utils";

(async function HermesUnstake() {
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
  const bal = await hermesClient.getBalance(hermesAddress, [AssetDOJNative]);
  const h4sBalance = baseToAsset(bal[0].amount).amount().toNumber();
  console.log("H4S Balance :: ", h4sBalance);

  let baseAmount = assetToBase(assetAmount(5, DOJ_DECIMAL));
    const txHash = await hermesClient.transfer({
      amount: baseAmount,
      recipient: "sdojima18amctk73m06h9ahv909lqw67qle49l6dl4x3tc",
    });
    console.log(txHash);
    

  /**
   * If a node issues a LEAVE while Active, they are eligible to churn back in on the next churn
   *
   * If a node issues a LEAVE while on Standby, the node is considered Disabled and will never churn back in.
   *
   * To leave the system, send the following transaction from your original bond address to the Vault Address: LEAVE:<ADDRESS> with at least 1 RUNE.
   *
   * Example:
   *
   * LEAVE:<node address>
   *
   * ⏱ Wait a few hours, verify on the /nodes endpoint that you are now Disabled 👀 Then send another LEAVE:
   *
   * LEAVE:<node address>
   *
   * ⏱ Wait a few minutes, verify you have received your bond back 👀 - make status should show BOND 0.00 and your wallet should get the full Bond back.
   */

  /** Leave node account from ACTIVE to STANDBY / DISABLED . So that unbond can be done */
  // const nodeAddress = "tdojima15lvkm2uwgzzspa8rlj2xy9qlk5hl6jjqxq4vq5";
  // const nodeAddress = "sdojima1efhlt9r04h7cty6tutns2z8ahk778klwly7l5l";
  // const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL));
  // const leaveNodeAddressHash = await hermesClient.deposit({
  //   amount: baseAmt,
  //   memo: `LEAVE:${nodeAddress}`,
  // });
  // console.log("Leave hash : ", leaveNodeAddressHash);

  // /** If node is in STANDBY make another leave tx to make it DISABLED . So that unbond can be done */
  // const nodeAddress = "tdojima19l30qd7tfq0hdmq34tc4na2m67eg0rd93sdf0x";
  // const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL));
  // const leaveNodeAddressHash = await hermesClient.deposit({
  //   amount: baseAmt,
  //   memo: `LEAVE:${nodeAddress}`,
  // });
  // console.log("Leave hash : ", leaveNodeAddressHash);

  // const nodeAddress = "tdojima19l30qd7tfq0hdmq34tc4na2m67eg0rd93sdf0x";
  // // const unbondAmount = 1000 * Math.pow(10, 8);
  // const unbondAmount = 12498002.49995994 * Math.pow(10, 8);
  // const baseAmt = assetToBase(assetAmount(1, DOJ_DECIMAL));
  // const removeBondByWhitelistedAddressHash = await hermesClient.deposit({
  //   amount: baseAmt,
  //   memo: `UNBOND:${nodeAddress}:${unbondAmount}`,
  // });
  // console.log("Unbond hash : ", removeBondByWhitelistedAddressHash);
})();
