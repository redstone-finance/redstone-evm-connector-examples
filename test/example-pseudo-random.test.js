const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example contract", function () {
  let exampleContract, wrappedContract;

  beforeEach(async () => {
    const ExampleRandom = await ethers.getContractFactory("ExamplePseudoRandom");
    exampleContract = await ExampleRandom.deploy();
    wrappedContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone", { asset: "ENTROPY" });

    // Provider authorization
    await wrappedContract.authorizeProvider();
  });

  it("Example run", async function () {
    const randomNumber = await wrappedContract.generateRandomNumber(1000);
    console.log({randomNumber: randomNumber.toNumber()});

    const maxNumbersCount = 16;
    const maxValue = 10000;
    const tx = await wrappedContract.generateManyRandomNumbers(maxNumbersCount, maxValue);
    await tx.wait();

    const manyRandoms = await wrappedContract.getGeneratedNFTIndexes();
    console.log({
      manyRandoms: manyRandoms.map(r => r.toNumber()),
    });
  });

});
