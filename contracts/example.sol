// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAwareOwnable.sol";

contract ExampleContract is PriceAwareOwnable {

  uint256 private lastPrice = 0;
  
  function setPrice() public {
    uint256 ethPrice = getPriceFromMsg(bytes32("TSLA"));
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns(uint256) {
    return lastPrice;
  }
}
