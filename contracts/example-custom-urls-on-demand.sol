// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleContractCustomUrlsOnDemand is PriceAware {

  uint256 private lastValue = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    // Signers for redstone node: redstone-custom-urls-on-demand-1
    return _receviedSigner == 0x63b3Cc527bFD6e060EB65d4e902667Ae19aEcEC2;
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
