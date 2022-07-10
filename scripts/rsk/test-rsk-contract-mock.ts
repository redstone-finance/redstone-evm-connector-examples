import { ethers } from "hardhat";

(async () => {
  const ExampleRedstoneRapid = await ethers.getContractFactory(
    "ExampleRedstoneRapidMock"
  );
  const contract = await ExampleRedstoneRapid.deploy();

  console.log(`Contract address: ${contract.address}`);

  const setPriceTransaction = await contract.setPrice();
  console.log(`Set price transaction hash: ${setPriceTransaction.hash}`);
  await setPriceTransaction.wait();
  const priceFromContract = await contract.getLastPrice();
  const readablePriceFromContract =
    priceFromContract.div(10 ** 6).toNumber() / 100;
  console.log(readablePriceFromContract);
})();
