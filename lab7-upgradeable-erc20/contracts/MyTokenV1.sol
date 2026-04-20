// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract MyTokenV1 is Initializable, ERC20Upgradeable {

    function initialize(uint256 initialSupply) public initializer {
        __ERC20_init("MyToken", "MTK");
        _mint(msg.sender, initialSupply);
    }
}