// const { WrapperBuilder } = require("redstone-flash-storage");
// const redstone = require("redstone-api");
const { expect } = require("chai");

// TODO: connect redstone oracle

describe("Example contract", function () {
  let exampleContract, tslaPrice;

  beforeEach(async () => {
    const ExampleRandom = await ethers.getContractFactory("ExampleRandom");
    exampleContract = await ExampleRandom.deploy();
  });

  it("Test", async function () {
    const randomNumber = await exampleContract.generateRandomNumber(5);
    console.log({randomNumber: randomNumber.toNumber()});

    const tx = await exampleContract.generateManyRandomNumbers(16, 120);
    await tx.wait();

    const manyRandoms = await exampleContract.getGeneratedNFTIndexes();
    console.log({
      manyRandoms: manyRandoms.map(r => r.toNumber()),
    });
  });

});
