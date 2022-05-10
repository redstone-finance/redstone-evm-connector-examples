const { WrapperBuilder } = require("redstone-evm-connector");

describe("Custom URL test", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractCustomUrls");
    exampleContract = await ExampleContract.deploy();
  });

  it("Custom URL test", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-custom-urls-demo", {
        // Check more details at: https://custom-urls-manifest-updater.redstone.finance/0x031f7bcd73d9f5ed
        asset: "0x031f7bcd73d9f5ed",
      });
    const valueFromOracle = await exampleContract.getValue();
    console.log({ valueFromOracle: valueFromOracle.toNumber() });
  });
});
