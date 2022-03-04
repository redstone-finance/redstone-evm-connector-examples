// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleContractMock is PriceAware {

  uint256 private lastPrice = 0;

  function isSignerAuthorized(address _receviedSigner) public override virtual view returns (bool) {
    return _receviedSigner == 0xFE71e9691B9524BC932C23d0EeD5c9CE41161884; // mock provider address
  }
  
  function setPrice() public {
    uint256 ethPrice = getPriceFromMsg(bytes32("HEHE"));
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns(uint256) {
    return lastPrice;
  }
}
