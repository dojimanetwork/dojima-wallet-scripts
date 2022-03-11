// impor
// console.log(getBalance("",""));
import { chains } from "../src/balance";


async function Balance() {
  const obj = new chains.Erc20TokenBalance(
    "https://mainnet.infura.io/v3/f37faaf5ddeb4e589d6f26300ed673a6"
  );
 
const Tether= await obj.getBalance(
    "TETHER",
    "0xBaEc28475bC40B4eEB7d2F8730B4cb5c2d5D952F"
  );
  console.log("Tether: ",Tether)

  const BNB= await obj.getBalance(
    "BNB",
    "0xf60c2ea62edbfe808163751dd0d8693dcb30019c"
  );
  console.log("BNB: ",BNB)

  const USDC= await obj.getBalance(
    "USDC",
    "0x55fe002aeff02f77364de339a1292923a15844b8"
  );
  console.log("USDC ",USDC)

  const WRAPPED_LUNA= await obj.getBalance(
    "WRAPPED_LUNA",
    "0x16b70f44719b227278a2dc1122e8106cc929ecd1"
  );
  console.log("WRAPPED_LUNA ",WRAPPED_LUNA)

  const HEX= await obj.getBalance(
    "HEX",
    "0x035a397725d3c9fc5ddd3e56066b7b64c749014e"
  );
  console.log("HEX: ",HEX)

  const BINANCE_USD= await obj.getBalance(
    "BINANCE_USD",
    "0x715134a16acb73c86e81df5542e1cf759eeb6fc7"
  );
  console.log("BINANCE_USD ",BINANCE_USD)

  
  return {Tether,HEX,BNB,BINANCE_USD,WRAPPED_LUNA,USDC}
}
Balance()
