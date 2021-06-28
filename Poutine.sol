// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "./node_modules/@openzeppelin/contracts/access/AccessControl.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract PTNToken is ERC20, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant BURNER_ROLE = keccak256("BURNER_ROLE");

    constructor(uint256 initialSupply) ERC20("Poutine", "PTN") {
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);

        mint(msg.sender, initialSupply);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
      _mint(to, amount);
    }

    function burn(address from, uint256 amount) public onlyRole(BURNER_ROLE) {
      _burn(from, amount);
    }
}
