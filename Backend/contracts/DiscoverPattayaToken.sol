// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract DiscoverPattayaToken is ERC20 {
    address payable owner;

    constructor() ERC20("DiscoverPattaya","DPT") {
        owner = payable(msg.sender);
        _mint( owner,100000000 * (10**18) );
    }
 
}