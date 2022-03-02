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
    console.log({ randomNumber: randomNumber.toNumber() });

    // const maxNumbersCount = 16;
    // const maxValue = 10000;
    // const tx = await wrappedContract.generateManyRandomNumbers(maxNumbersCount, maxValue);
    // await tx.wait();

    // const manyRandoms = await wrappedContract.getGeneratedNFTIndexes();
    // console.log({
    //   manyRandoms: manyRandoms.map(r => r.toNumber()),
    // });
  });

  it("Example with custom configuration", async function () {
    wrappedContract = WrapperBuilder
    .wrapLite(exampleContract)
    .usingPriceFeed("custom", {
      asset: "ENTROPY",
      dataSources: {
        "sources": [
          {
            "type": "cache-layer",
            "url": "https://api.redstone.finance",
            "providerId": "I-5rWUehEv-MjdK9gFw09RxfSLQX9DIHxG614Wf8qo0",
            "evmSignerAddress": "0x0C39486f770B26F5527BBBf942726537986Cd7eb"
          }
        ],
        "defaultSignerEvmAddress": "0x0C39486f770B26F5527BBBf942726537986Cd7eb",
        "valueSelectionAlgorithm": "first-valid",
        "timeoutMilliseconds": 10000,
        "maxTimestampDiffMilliseconds": 150000,
        "preVerifySignatureOffchain": true
      }
    });

    const randomNumber = await wrappedContract.generateRandomNumber(1000);
    console.log({ randomNumber: randomNumber.toNumber() });
  });

});
