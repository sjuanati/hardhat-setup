//SPDX-License-Identifier: Unlicense
pragma solidity ^0.7.6;
pragma abicoder v2;

import "hardhat/console.sol";

contract Global {
    enum Status {MALE, FEMALE, UNKNOWN}

    string message;
    address public owner;
    uint256 number;
    bytes32 title;

    struct Person {
        string name;
        uint16 age;
        uint256 birthday;
        Status status;
    }

    mapping(address => Person) public person;

    Person[] public people;

    modifier onlyAdmin() {
        require(msg.sender == owner, "only admin");
        _;
    }

    constructor(string memory _message) {
        message = _message;
        owner = msg.sender;
    }

    function setMessage(string memory _message) external onlyAdmin {
        //console.log("Changing greeting from '%s' to '%s'", message, _message);
        message = _message;
    }

    function getMessage() external view returns (string memory) {
        return message;
    }

    function setTitle(bytes32 _title) external {
        title = _title;
    }

    function getTitle() public view returns (bytes32) {
        return title;
    }

    function deposit() external payable {
        require(msg.value > 0, "must send >0 eth");
    }

    function transfer(address target) public payable {
        require(msg.value > 0, "must send a value higher than 0");
        payable(target).transfer(msg.value);
    }

    function changeStatus(address target, Status _status) external {
        person[target].status = _status;
    }

    function getPerson(address _account) public view returns (Person memory) {
        return person[_account];
    }

    function addPerson(
        string calldata _name,
        uint16 _age,
        uint256 _birthday,
        Status _status
    ) external {
        people.push(Person(_name, _age, _birthday, _status));
    }

    function getPeople() public view returns (Person[] memory) {
        return people;
    }

    function getBalance() external view returns (uint256) {
        return payable(address(this)).balance;
    }
}
