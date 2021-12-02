const { WrapperBuilder } = require("redstone-evm-connector");
const redstone = require("redstone-api");
const { expect } = require("chai");

// function arePricesSimilar(priceFromContract, price, maxDiff = 1) {
//   const diff = Math.abs((priceFromContract.toNumber() / (10 ** 8)) - price);
//   return diff <= maxDiff;
// }

async function sleep(ms) {
  await new Promise((resolve) => setTimeout(resolve, ms));
}

function convertBignNumberToPrice(bn) {
  return bn.toNumber() / (10 ** 8);
}

describe("Example Avalanche contract", function () {
  let exampleContract, tslaPrice;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleAvalancheContract");
    exampleContract = await ExampleContract.deploy();
    // tslaPrice = (await redstone.getPrice("TSLA")).value;
  });

  it("AVAX and PNG prices - price package", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche");
    await exampleContract.authorizeProvider();
    await sleep(5000);
    await exampleContract.setManyPrices();
    const pngPrice = await exampleContract.getPngPrice();
    const avaxPrice = await exampleContract.getAvaxPrice();
    console.log({
      png: convertBignNumberToPrice(pngPrice),
      avax: convertBignNumberToPrice(avaxPrice),
    });
    // expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });

  it("AVAX price - single price", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche", { asset: "AVAX" });
    await exampleContract.authorizeProvider();

    await sleep(5000);
    await exampleContract.setSinglePrice();
    const avaxPrice = await exampleContract.getAvaxPrice();
    console.log({ avax: convertBignNumberToPrice(avaxPrice) });
    // expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });
});
