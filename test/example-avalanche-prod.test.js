const { WrapperBuilder } = require("redstone-evm-connector");

describe("Example avalanche prod", function () {
  let exampleContract;

  beforeEach(async () => {
    const ExampleContract = await ethers.getContractFactory("ExampleContractAvalancheProd");
    exampleContract = await ExampleContract.deploy();
  });

  it("AVAX price test - price package", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod");
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    console.log({ priceFromContract: priceFromContract.toNumber() });
  });

  it("AVAX price test - single price", async function () {
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod", { asset: "AVAX" });
    await exampleContract.setPrice();
    const priceFromContract = await exampleContract.getLastPrice();
    console.log({ priceFromContract: priceFromContract.toNumber() });
  });

  it("YY price test - single price", async function () {
    const yySymbol = "$YYAV3SA1";
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod", { asset: yySymbol });
    const bytes23Symbol = ethers.utils.formatBytes32String(yySymbol);
    const yyValueFromContract = await exampleContract.getPriceSecurely(bytes23Symbol);
    console.log({ [yySymbol]: yyValueFromContract.toNumber() });
  });

  it("YY price test - with package", async function () {
    const yySymbol = "$YYAV3SA1";
    exampleContract = WrapperBuilder
      .wrapLite(exampleContract)
      .usingPriceFeed("redstone-avalanche-prod");
    const bytes23Symbol = ethers.utils.formatBytes32String(yySymbol);
    const yyValueFromContract = await exampleContract.getPriceSecurely(bytes23Symbol);
    console.log({ [yySymbol]: yyValueFromContract.toNumber() });
  });
});
