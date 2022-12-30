// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Faucet is ERC20 {
    address payable owner;
    IERC20 public token;
    uint256 freeTokenAmount = 1000 * (10**18);

    constructor(IERC20 _tokenAddress) ERC20("DiscoverPattaya","DPT") {
        owner = payable(msg.sender);
        token = _tokenAddress;
    }

    function giveFunds() public payable {
        require(token.balanceOf(address(this)) >= freeTokenAmount, "Faucet is empty at the moment...");
        token.transfer(msg.sender,freeTokenAmount);
    }

    function withdrawAll() public payable {
        require(msg.sender == owner,"You are not the owner");
        token.transfer(owner,token.balanceOf(address(this)));
    }

}