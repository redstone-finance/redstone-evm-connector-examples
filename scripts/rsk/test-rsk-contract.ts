import { ethers } from "hardhat";
import { WrapperBuilder } from "redstone-evm-connector";
import { ExampleRedstoneRapid as ExampleRedstoneRapidType } from "../../typechain/ExampleRedstoneRapid";

(async () => {
  const ExampleRedstoneRapid = await ethers.getContractFactory(
    "ExampleRedstoneRapid"
  );
  const contract = await ExampleRedstoneRapid.deploy();

  console.log(`Contract address: ${contract.address}`);

  const wrappedContract = WrapperBuilder.wrapLite<ExampleRedstoneRapidType>(
    contract as ExampleRedstoneRapidType
  ).usingPriceFeed("redstone-rapid", {
    asset: "ETH",
  });

  const setPriceTransaction = await wrappedContract.setPrice();
  console.log(`Set price transaction hash: ${setPriceTransaction.hash}`);
  await setPriceTransaction.wait();
  const priceFromContract = await wrappedContract.getLastPrice();
  const readablePriceFromContract =
    priceFromContract.div(10 ** 6).toNumber() / 100;
  console.log(readablePriceFromContract);
})();
