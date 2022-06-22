const { WrapperBuilder } = require("redstone-evm-connector");
const ethers = require("ethers");
const ExampleContract = require("../artifacts/contracts/example.sol/ExampleContract.json");
const utils = require("./utils");


// Before running this script you should run ganache
// Learn more at: https://www.trufflesuite.com/ganache
// And put your privateKey to ../.secrets.json as { "privateKey": "REPLACE_WITH_PRIVATE_KEY..." }

(async () => {
  console.log("Deploying the contract");
  const wallet = utils.getWallet();
  const address = await utils.deployContract(ExampleContract, wallet);

  // Wrapping contract with redstone-stocks provider
  console.log("Contract wrapping");
  const contract = new ethers.Contract(address, ExampleContract.abi, wallet);
  const wrappedContract = WrapperBuilder
    .wrapLite(contract)
    .usingPriceFeed("redstone-stocks", { asset: "TSLA" });

  // Provider should be authorized once after contract deployment
  // You should be the owner of the contract to authorize provider
  await wrappedContract.authorizeProvider();

  // Then, you can interact with your wrapped contract
  console.log("Interacting with contract");
  await wrappedContract.setPrice();
  const price = await wrappedContract.getLastPrice();
  console.log("Got TSLA price in contract: " + price / (10 ** 8));
})();
