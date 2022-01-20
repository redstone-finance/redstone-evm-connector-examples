// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./example-b-price-aware.sol";
import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";
import "redstone-evm-connector/lib/contracts/message-based/ProxyConnector.sol";

contract ExampleAContract is ProxyConnector {

  ExampleBPriceAwareContract private bContract;

  constructor() {
    bContract = new ExampleBPriceAwareContract();
  }
  
  function setPriceInContractB() public {
    // Usually we would simply call the one instruction below
    // bContract.setPrice();

    // But to proxy calldata we need to add a bit more instructions
    proxyCalldata(
      address(bContract),
      abi.encodeWithSelector(ExampleBPriceAwareContract.setPrice.selector));
  }

  function getPriceFromContractB() public view returns(uint256) {
    return bContract.getLastTeslaPrice();
  }
}
