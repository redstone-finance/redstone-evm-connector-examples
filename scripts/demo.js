const { WrapperBuilder } = require("redstone-flash-storage");
const ethers = require("ethers");
const ExampleContract = require("../artifacts/contracts/example.sol/ExampleContract.json");
const { privateKey } = require("../.secrets.json");

// Before running this script you should run ganache
// Learn more at: https://www.trufflesuite.com/ganache
// And put your privateKey to ../.secrets.json as { "privateKey": "REPLACE_WITH_PRIV..." }

(async () => {
  console.log("Deploying the contract");
  const wallet = getWallet();
  const address = await deployContract(wallet);

  // Wrapping contract with redstone-stocks provider
  console.log("Contract wrapping");
  const contract = new ethers.Contract(address, ExampleContract.abi, wallet);
  const wrappedContract = WrapperBuilder
    .wrapLite(contract)
    .usingPriceFeed("redstone-stocks", "TSLA");

  // Provider shoud be authorized once after contract deployment
  // You should be the owner of the contract to authorise provider
  await wrappedContract.authorizeProvider();

  // Then, you can interact with your wrapped contract
  console.log("Interacting with contract");
  await wrappedContract.setPrice();
  const price = await wrappedContract.getLastPrice();
  console.log("Got TSLA price in contract: " + price / (10 ** 8));
})();

function getWallet() {
  const url = "http://localhost:7545";
  const provider = new ethers.providers.JsonRpcProvider(url);
  return new ethers.Wallet(privateKey, provider);
}

async function deployContract(wallet) {
  const factory = new ethers.ContractFactory(
    ExampleContract.abi,
    ExampleContract.bytecode,
    wallet);
  const contract = await factory.deploy();
  await contract.deployed(); // Waiting for contract to be deployed
  return contract.address;
}
