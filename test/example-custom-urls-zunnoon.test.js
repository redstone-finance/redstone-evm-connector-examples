const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example Custom URL (Zunnoon)", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractCustomUrlsZunnoon");
    exampleContract = await ExampleContract.deploy();
  });

  it("Custom URL test", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-custom-urls-demo", {
        // Check more details at: https://custom-urls-manifest-updater.redstone.finance/0xb2879295dbfe3cf0
        asset: "0xb2879295dbfe3cf0",
      });
    const valueFromOracle = await exampleContract.getValue();
    console.log({ valueFromOracle: valueFromOracle.toNumber() });
  });
});
