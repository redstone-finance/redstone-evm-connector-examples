const { WrapperBuilder } = require("redstone-evm-connector");
const redstone = require("redstone-api");
const { expect } = require("chai");

function arePricesSimilar(priceFromContract, price, maxDiff = 1) {
  const diff = Math.abs((priceFromContract.toNumber() / (10 ** 8)) - price);
  return diff <= maxDiff;
}

describe("Example contract", function () {
  let exampleAContract, tslaPrice;

  beforeEach(async () => {
    const ExampleAContract = await ethers.getContractFactory("ExampleAContract");
    exampleAContract = await ExampleAContract.deploy();
    tslaPrice = (await redstone.getPrice("TSLA")).value;
  });

  it("Call contract A that calls contract B", async function () {
    wrappedContract = WrapperBuilder
      .wrapLite(exampleAContract)
      .usingPriceFeed("redstone-stocks");
    await wrappedContract.setPriceInContractB();
    const priceFromContract = await wrappedContract.getPriceFromContractB();
    console.log({priceFromContract});
    expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });
});
