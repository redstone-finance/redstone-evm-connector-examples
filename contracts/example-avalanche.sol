// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleAvalancheContract is PriceAware {

  uint256 private avaxPrice = 0;
  uint256 private pngPrice = 0;
  
  function setManyPrices() public {
    avaxPrice = getPriceFromMsg(bytes32("AVAX"));
    pngPrice = getPriceFromMsg(bytes32("PNG"));
  }

  function setSinglePrice() public {
    avaxPrice = getPriceFromMsg(bytes32("AVAX"));
  }

  function getAvaxPrice() public view returns(uint256) {
    return avaxPrice;
  }

  function getPngPrice() public view returns(uint256) {
    return pngPrice;
  }

}
