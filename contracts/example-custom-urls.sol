// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleContractCustomUrls is PriceAware {

  uint256 private lastValue = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    // For redstone-avalanche-prod price feed (it has 2 authorised signers)
    return _receviedSigner == 0x11fFFc9970c41B9bFB9Aa35Be838d39bce918CfF
      || _receviedSigner == 0xdBcC2C6c892C8d3e3Fe4D325fEc810B7376A5Ed6;
  }

  function getValue() public view returns(uint256) {
    // You can check more symbols at: https://custom-urls-manifest-updater.redstone.finance/

    // Id 0x031f7bcd73d9f5ed corresponds to the following data:
    // URL: https://min-api.cryptocompare.com/data/pricemultifull?fsyms=ETH&tsyms=USD
    // JSON path: $.RAW.ETH.USD.PRICE
    uint256 valueFromUrl = getPriceFromMsg(bytes32("0x031f7bcd73d9f5ed"));
    return valueFromUrl;
  }
}
