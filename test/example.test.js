const { WrapperBuilder } = require("redstone-evm-connector");
const redstone = require("redstone-api");
const { expect } = require("chai");

function arePricesSimilar(priceFromContract, price, maxDiff = 1) {
  const diff = Math.abs((priceFromContract.toNumber() / (10 ** 8)) - price);
  return diff <= maxDiff;
}

describe("Example contract", function () {
  let exampleContract, tslaPrice;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContract");
    exampleContract = await ExampleContract.deploy();
    tslaPrice = (await redstone.getPrice("TSLA")).value;
  });

  it("TSLA price test with authorization by address - price package", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-stocks");
    await exampleContract.authorizeSigner("0x926E370fD53c23f8B71ad2B3217b227E41A92b12");
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });

  it("TSLA price test with simple authorization - price package", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-stocks");
    await exampleContract.authorizeProvider();
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });

  it("TSLA price test with simple authorization - single price", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-stocks", { asset: "TSLA" });
    await exampleContract.authorizeProvider();
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });
});
