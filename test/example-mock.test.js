const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example contract mock", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractMock");
    exampleContract = await ExampleContract.deploy();
  });

  it("Test with mock provider", async function () {
    const wrappedContract = WrapperBuilder
      .mockLite(exampleContract)
      .using({'ETH': 2005, 'BTC': 45000, 'REDSTONE': 100000, 'HEHE': 123});

    await wrappedContract.setPrice();
  
    const priceFromContract = await exampleContract.getLastPrice();

    console.log({ priceFromContract: priceFromContract.toNumber() });
  });
});
