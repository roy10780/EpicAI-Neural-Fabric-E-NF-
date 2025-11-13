// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EpicAIToken {
    string public name = "EpicAI Token";
    string public symbol = "EAI";
    uint256 public totalSupply = 1000000;
    mapping(address => uint256) public balanceOf;

    constructor() {
        balanceOf[msg.sender] = totalSupply;
    }

    function transfer(address to, uint256 amount) public returns(bool) {
        require(balanceOf[msg.sender] >= amount, "Saldo insuficiente");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}
