const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example Custom URL", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractCustomUrls");
    exampleContract = await ExampleContract.deploy();
  });

  it("Custom URL test", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-custom-urls-demo", {
        // Check more details at: https://custom-urls-manifest-updater.redstone.finance/0x60cbe6b18347697f
        asset: "0x60cbe6b18347697f",
      });
    const valueFromOracle = await exampleContract.getValue();
    console.log({ valueFromOracle: valueFromOracle.toNumber() });
  });
});
