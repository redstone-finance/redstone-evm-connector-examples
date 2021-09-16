const { default: WrapperBuilder } = require("redstone-flash-storage/lib/utils/v2/impl/builder/WrapperBuilder");

describe("Example contract", function () {
  it("TSLA price test", async function () {
    const ExampleContract = await ethers.getContractFactory("ExampleContract");

    let exampleContract = await ExampleContract.deploy();

    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-stocks", "TSLA");

    await exampleContract.execute();
  });

  it("Mock test", async function () {
    const ExampleContract = await ethers.getContractFactory("ExampleContract");

    let exampleContract = await ExampleContract.deploy();

    exampleContract = WrapperBuilder
      .mockLite(exampleContract)
      .using(10);

    await exampleContract.execute();
  });
});
