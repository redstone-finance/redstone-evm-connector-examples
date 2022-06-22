// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleRedstoneRapid is PriceAware {

  uint256 private lastPrice = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    return _receviedSigner == 0xf786a909D559F5Dee2dc6706d8e5A81728a39aE9; // redstone-rapid
  }
  
  function setPrice() public {
    uint256 ethPrice = getPriceFromMsg(bytes32("ETH"));
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns(uint256) {
    return lastPrice;
  }
}
