// const { WrapperBuilder } = require("redstone-evm-connector");
// const redstone = require("redstone-api");
// const { expect } = require("chai");

describe("Example strings contract", function () {
  let exampleContract, tslaPrice;

  beforeEach(async () => {
    const ExampleStringsContract = await ethers.getContractFactory("ExampleStringsContract");
    exampleContract = await ExampleStringsContract.deploy();
  });

  it("Quick test", async function () {
    const addresses = [
      "0xb794f5ea0ba39494ce839613fffba74279579261",
      "0xb794f5ea0ba39494ce839613fffba74279579262",
      "0xb794f5ea0ba39494ce839613fffba74279579263",
    ];
    const result1 = await exampleContract.testFunGetter(addresses[0]);
    const result2 = await exampleContract.testFunGetter(addresses[1]);
    const result3 = await exampleContract.testFunGetter(addresses[2]);
    console.log({
      result1,
      result2,
      result3,
    });
  });
});
