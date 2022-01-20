const { WrapperBuilder } = require("redstone-evm-connector");
const redstone = require("redstone-api");
const { expect } = require("chai");

function arePricesSimilar(priceFromContract, price, maxDiff = 1) {
  const diff = Math.abs((priceFromContract.toNumber() / (10 ** 8)) - price);
  return diff <= maxDiff;
}

describe("Example contract", function () {
  let contractA, tslaPrice;

  beforeEach(async () => {
    const ContractA = await ethers.getContractFactory("ContractA");
    contractA = await ContractA.deploy();
    tslaPrice = (await redstone.getPrice("TSLA")).value;
  });

  it("Call contract A that calls contract B", async function () {
    wrappedContractA = WrapperBuilder
      .wrapLite(contractA)
      .usingPriceFeed("redstone-stocks");

    // Example of writing to state
    await wrappedContractA.writeInContractB();

    // Example of reading from contract A (which read from contract B)
    const priceFromContract = await wrappedContractA.readFromContractB();
    console.log({ priceFromContract });
    expect(arePricesSimilar(priceFromContract, tslaPrice)).to.equal(true);
  });
});
