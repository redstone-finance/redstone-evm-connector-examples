import { ethers } from "hardhat";
import { WrapperBuilder } from "redstone-evm-connector";
import { ExampleRedstoneRapid as ExampleRedstoneRapidType } from "../../typechain/ExampleRedstoneRapid";

const ONE_MINUTE_IN_MILLISECONDS = 60 * 1000;

(async () => {
  setInterval(async () => {
    const ExampleRedstoneRapid = await ethers.getContractFactory("ExampleRedstoneRapid");
    const contract = ExampleRedstoneRapid.attach("0x789262eaC6C63e99c74393db2c6833e6B4DEa77b");
    // const contract = await ExampleRedstoneRapid.deploy();
    // const contractDeployed = await contract.deployed();

    console.log(`Contract address: ${contract.address}`);

    const wrappedContract = WrapperBuilder
      .wrapLite<ExampleRedstoneRapidType>(contract as ExampleRedstoneRapidType)
      .usingPriceFeed("redstone-rapid", {
        asset: "ETH",
      });

    const setPriceTransaction = await wrappedContract.setPrice({ gasLimit: 55000 });
    console.log(`Set price transaction hash: ${setPriceTransaction.hash}`);
    const priceFromContract = await wrappedContract.getLastPrice();
    console.log(priceFromContract);
  }, ONE_MINUTE_IN_MILLISECONDS)
})();
