// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

import "./Roles.sol";

contract Farmer {
  using Roles for Roles.Role;

  event FarmerAdded(address indexed _account);
  event FarmerRemoved(address indexed _account);

  Roles.Role  farmersList;

  constructor() public {
    farmersList.addRole(msg.sender);
    emit FarmerAdded(msg.sender);
  }

  ///@dev Modifiers for Farmer.
  modifier onlyFarmer() {
    require(isFarmer(msg.sender));
    _;
  }
  /*-----------------------------*/

  ///@dev Farmer Utility functions.
  function isFarmer(address _account) public view returns (bool) {
    return farmersList.hasRole(_account);
  }

  function addFarmer(address _account ) public {
    farmersList.addRole(_account);
    emit FarmerAdded(_account);
  }

  function removeFarmer() public {
    farmersList.removeRole(msg.sender);
    emit FarmerRemoved(msg.sender);
  }
  /*-----------------------------*/

}
