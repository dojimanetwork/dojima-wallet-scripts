import Erc20TokenBalance from "../src/balance/erc20/balance";

async function erc20() {
  const inst = new Erc20TokenBalance(
    "letter ethics correct bus asset pipe tourist vapor envelope kangaroo warm dawn",
    "mainnet"
  );
  const BNB1 = await inst.getBalance('BNB');
  console.log(BNB1);
  const BINANCE_USD = await inst.getBalance('BINANCE_USD', '0x21a31ee1afc51d94c2efccaa2092ad1028285549');
  console.log(BINANCE_USD);
  const BNB = await inst.getBalance('BNB', '0xf60c2ea62edbfe808163751dd0d8693dcb30019c');
  console.log(BNB);
  const CHAINLINK_TOKEN = await inst.getBalance('CHAINLINK_TOKEN', '0x3cd751e6b0078be393132286c442345e5dc49699');
  console.log(CHAINLINK_TOKEN);
  const CRONOS_COIN = await inst.getBalance('CRONOS_COIN', '0xb739d0895772dbb71a89a3754a160269068f0d45');
  console.log(CRONOS_COIN);
  const DAI_STABLECOIN = await inst.getBalance('DAI_STABLECOIN', '0xd1e4a32679216f4a4dd38e45dab9bc4b8a45e592');
  console.log(DAI_STABLECOIN);
  const FANTOM = await inst.getBalance('FANTOM', '0xa1d8d972560c2f8144af871db508f0b0b10a3fbf');
  console.log(FANTOM);
  const MAKER_DAO = await inst.getBalance('MAKER_DAO', '0xa939bffb33bed18dc0063737cb9ea41a1fdb2fe3');
  console.log(MAKER_DAO);
  const MATIC = await inst.getBalance('MATIC', '0xa83b11093c858c86321fbc4c20fe82cdbd58e09e');
  console.log(MATIC);
  const SHIBA_INU = await inst.getBalance('SHIBA_INU', '0x95a9bd206ae52c4ba8eecfc93d18eacdd41c88cc');
  console.log(SHIBA_INU);
  const TETHER = await inst.getBalance('TETHER', '0xec30d02f10353f8efc9601371f56e808751f396f');
  console.log(TETHER);
  const UNISWAP = await inst.getBalance('UNISWAP', '0x56178a0d5f301baf6cf3e1cd53d9863437345bf9');
  console.log(UNISWAP);
  const USDC = await inst.getBalance('USDC', '0x21a31ee1afc51d94c2efccaa2092ad1028285549');
  console.log(USDC);
  const VE_CHAIN = await inst.getBalance('VE_CHAIN', '0xd01e0c638a5924eded27fa0728ef6997572db0f7');
  console.log(VE_CHAIN);
  const WRAPPED_BTC = await inst.getBalance('WRAPPED_BTC', '0xcbcdf9626bc03e24f779434178a73a0b4bad62ed');
  console.log(WRAPPED_BTC);
  const WRAPPED_LUNA = await inst.getBalance('WRAPPED_LUNA', '0x60a39010e4892b862d1bb6bdde908215ac5af6f3');
  console.log(WRAPPED_LUNA);
  const WRAPPED_UST = await inst.getBalance('WRAPPED_UST', '0xeb2629a2734e272bcc07bda959863f316f4bd4cf');
  console.log(WRAPPED_UST);
  return;
}

(async () => {
  await erc20();
})();
