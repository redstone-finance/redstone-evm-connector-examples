const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example Custom URL (on-demand)", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractCustomUrlsOnDemand");
    exampleContract = await ExampleContract.deploy();
  });

  it("Custom URL test", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingCustomRequestsOnDemand({
        nodes: [
          "https://requests-proxy-node-1.redstone.finance",
        ],
        customRequestDetails: {
          url: "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD",
          jsonpath: "$.RAW.ETH.USD.PRICE",
          expectedSymbol: "0x031f7bcd73d9f5ed",
        },
      });
    const valueFromOracle = await exampleContract.getValue();
    console.log({ valueFromOracle: valueFromOracle.toNumber() });
  });
});
