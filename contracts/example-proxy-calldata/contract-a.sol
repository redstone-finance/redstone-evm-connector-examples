// SPDX-License-Identifier: MIT

pragma solidity ^0.8.2;

import "./contract-b.sol";
import "redstone-evm-connector/lib/contracts/message-based/PriceAware.sol";
import "redstone-evm-connector/lib/contracts/message-based/ProxyConnector.sol";

contract ContractA is ProxyConnector {

  ContractB private contractB;

  constructor() {
    contractB = new ContractB();
  }
  
  function writeInContractB() public {
    // Usually we would simply call the one instruction below
    // bContract.setPrice();

    // But to proxy calldata we need to add a bit more instructions
    proxyCalldata(
      address(contractB),
      abi.encodeWithSelector(ContractB.writeValue.selector));
  }

  function readFromContractB() public returns(uint256 value) {
    // Usually we would simply call the one instruction below
    // return bContract.getLastTeslaPrice();

    // But to proxy calldata we need to add a bit more instructions
    // TODO: Kuba, do you know how to convert get the actual function response here?
    return proxyCalldata(
      address(contractB),
      abi.encodeWithSelector(ContractB.getValue.selector));
  }
}
