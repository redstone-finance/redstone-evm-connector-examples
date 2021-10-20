const ethers = require("ethers");
const { privateKey } = require("../.secrets.json");

const JSON_RPC_URL = "http://localhost:7545";
let network = "local"; // you can change it to "kovan"

function getWallet() {
  const provider = getProvider();
  return new ethers.Wallet(privateKey, provider);
}

function getProvider() {
  if (network == "local") {
    return new ethers.providers.JsonRpcProvider(JSON_RPC_URL);
  } else {
    return ethers.getDefaultProvider(network);
  }
}

async function deployContract(contract, wallet) {
  const factory = new ethers.ContractFactory(
    contract.abi,
    contract.bytecode,
    wallet);
  const deployedContract = await factory.deploy();
  await deployedContract.deployed(); // Waiting for contract to be deployed
  return deployedContract.address;
}

module.exports = {
  getWallet,
  getProvider,
  deployContract,
};
