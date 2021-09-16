// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-flash-storage/lib/contracts/message-based/PriceAware.sol";
import "redstone-flash-storage/lib/contracts/mocks/MockStatePriceProvider.sol";

contract ExampleContract is PriceAware {
  
  function execute() public view returns(uint256) {
    console.log("Geting TSLA price");
    uint256 ethPrice = getPriceFromMsg(bytes32("TSLA"));
    // console.log(ethPrice);
    return ethPrice;
  }

  function getTime() public view returns(uint256) {
    return block.timestamp;
  }

}
