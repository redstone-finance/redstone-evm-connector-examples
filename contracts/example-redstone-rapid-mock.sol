// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleRedstoneRapidMock is PriceAware {
  uint256 private lastPrice = 0;

  function isSignerAuthorized(address _receviedSigner)
    public
    view
    virtual
    override
    returns (bool)
  {
    return _receviedSigner == 0xf786a909D559F5Dee2dc6706d8e5A81728a39aE9; // redstone-rapid
  }

  function setPrice() public {
    uint256 ethPrice = 42 * 10**8;
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns (uint256) {
    return lastPrice;
  }
}
