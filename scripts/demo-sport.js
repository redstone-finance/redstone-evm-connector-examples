const { WrapperBuilder } = require("redstone-evm-connector");
const ethers = require("ethers");
const ExampleSportContract = require("../artifacts/contracts/example-sport.sol/ExampleSportContract.json");
const utils = require("./utils");

// Before running this script you should run ganache
// Learn more at: https://www.trufflesuite.com/ganache
// And put your privateKey to ../.secrets.json as { "privateKey": "REPLACE_WITH_PRIV..." }
// (The wallet for the private key should have some ethers)
// Then run from the root project folder: node scripts/demo-sport.js

const REDSTONE_SPORT_ARWEAVE_ADDRESS = "FZT169LoGEqAu74iix97vHoRPWqXnqLL5RJZviqewTg"
const REDSTONE_SPORT_ETHEREUM_ADDRESS = "0xf61181287e0A78Ef7758548F74d7C7575701BA21";

(async () => {
  // *** THE CODE BELOW CAN BE EXECUTED IN A DEPLOYMENT SCRIPT *** //

  console.log("Deploying the contract");
  const wallet = utils.getWallet();
  const address = await utils.deployContract(ExampleSportContract, wallet);
  const contract = new ethers.Contract(address, ExampleSportContract.abi, wallet);

  // Provider shoud be authorized once after contract deployment
  // You should be the owner of the contract to authorise provider
  const authTx = await contract.authorizeSigner(REDSTONE_SPORT_ETHEREUM_ADDRESS);
  await authTx.wait();

  // Setting max delay to 2 hours
  // You should be the owner of the contract for being able to set max delay
  const maxDelaySeconds = 2 * 3600;
  const maxDelayTx = await contract.setMaxDelay(maxDelaySeconds);
  await maxDelayTx.wait();


  // *** THE CODE BELOW CAN BE EXECUTED IN A DAPP *** //

  // Wrapping contract with redstone-sport provider
  console.log("Contract wrapping");
  const wrappedContract = WrapperBuilder
    .wrapLite(contract)
    .usingPriceFeed(REDSTONE_SPORT_ARWEAVE_ADDRESS);

  // Then, you can interact with your wrapped contract
  console.log("Interacting with the contract");
  const setOutcomesTx = await wrappedContract.setOutcomes();
  await setOutcomesTx.wait();
  const outcome0 = await wrappedContract.getOutcome(0);
  const outcome1 = await wrappedContract.getOutcome(1);
  const mostProbableWinner = await wrappedContract.getMostProbableWinner();
  console.log({
    outcome0: outcome0.toNumber() / 10 ** 8,
    outcome1: outcome1.toNumber() / 10 ** 8,
    mostProbableWinner,
  });
})();
