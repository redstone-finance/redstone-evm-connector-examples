import { ethers } from "hardhat";
import { WrapperBuilder } from "redstone-evm-connector";
import { ExampleRedstoneRapidMock as ExampleRedstoneRapidMockType } from "../../typechain";

(async () => {
  const ExampleRedstoneRapidMock = await ethers.getContractFactory(
    "ExampleRedstoneRapidMock"
  );
  const contract = await ExampleRedstoneRapidMock.deploy();

  console.log(`Contract address: ${contract.address}`);

  const wrappedContract = WrapperBuilder.wrapLite<ExampleRedstoneRapidMockType>(
    contract as ExampleRedstoneRapidMockType
  ).usingPriceFeed("redstone-rapid", {
    asset: "ETH",
  });

  const setPriceTransaction = await wrappedContract.setPrice();
  console.log(setPriceTransaction);
  console.log(`Set price transaction hash: ${setPriceTransaction.hash}`);
  await setPriceTransaction.wait();
  const priceFromContract = await wrappedContract.getLastPrice();
  const readablePriceFromContract =
    priceFromContract.div(10 ** 6).toNumber() / 100;
  console.log(readablePriceFromContract);
})();
