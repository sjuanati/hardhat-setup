//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.6;

import "hardhat/console.sol";

contract TestHH {
    enum Status {MALE, FEMALE, UNKNOWN}

    string public message;
    uint256 number;
    bytes32 title;

    struct Person {
        string name;
        uint16 age;
        Status status;
    }

    mapping(address => Person) public person;

    uint256[] public devices;

    constructor(string memory _message) {
        message = _message;
    }

    function greet() public view returns (string memory) {
        return message;
    }

    function setMessage(string memory _message) public {
        console.log("Changing greeting from '%s' to '%s'", message, _message);
        message = _message;
    }

    function setTitle(bytes32 _title) external {
        title = _title;
    }

    function transfer(address target) public payable {
        require(msg.value > 0, "must send a value higher than 0");
        payable(target).transfer(msg.value);
    }

    function changeStatus(address target, Status _status) external {
        person[target].status = _status;
    }
}
