const { WrapperBuilder } = require("redstone-evm-connector");
const redstone = require("redstone-api");

describe("Example contract", function () {
  let exampleContract, tslaPrice;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractAvalancheProd");
    exampleContract = await ExampleContract.deploy();
    tslaPrice = (await redstone.getPrice("AVAX")).value;
  });

  it("AVAX price test with authorization by address - price package", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod");
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    console.log({ priceFromContract: priceFromContract.toNumber() });
  });

  it("AVAX price test with simple authorization - single price", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod", { asset: "AVAX" });
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    console.log({ priceFromContract: priceFromContract.toNumber() });
  });
});
