const { expect } = require("chai");
const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example contract mock", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractMock");
    exampleContract = await ExampleContract.deploy();
  });

  it("Test with mock provider (obj)", async function () {
    const wrappedContract = WrapperBuilder
      .mockLite(exampleContract)
      .using({'ETH': 2005, 'BTC': 45000, 'REDSTONE': 100000, 'HEHE': 123});

    await wrappedContract.setPrice();
  
    const priceFromContract = await exampleContract.getLastPrice();

    expect(priceFromContract.toNumber()).to.equal(123 * (10 ** 8));
  });


  it("Test with mock provider (fun)", async function () {
    function mockPriceFun(curTimestamp) {
      return {
        timestamp: curTimestamp - 5000,
        prices: [
          { symbol: 'ETH', value: 2005 },
          { symbol: 'HEHE', value: 42 },
        ]
      }
    }
    
    const wrappedContract = WrapperBuilder
      .mockLite(exampleContract)
      .using(mockPriceFun);

    await wrappedContract.setPrice();
  
    const priceFromContract = await exampleContract.getLastPrice();

    expect(priceFromContract.toNumber()).to.equal(42 * (10 ** 8));
  });
});
