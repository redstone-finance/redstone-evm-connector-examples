// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";

contract ExampleRedstoneRapid is PriceAware {
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

  function getMaxBlockTimestampDelay() public pure override returns (uint256) {
    return 120; // 2 minutes block timestamp lag is acceptable
  }

  function setPrice() public {
    uint256 ethPrice = getEthPriceUsingOracle();
    lastPrice = ethPrice;
  }

  function getLastPrice() public view returns (uint256) {
    return lastPrice;
  }

  function getEthPriceUsingOracle() public view returns (uint256) {
    return getPriceFromMsg(bytes32("ETH"));
  }
}
