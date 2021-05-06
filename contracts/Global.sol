//SPDX-License-Identifier: Unlicense.
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
        require(person[msg.sender].age == 0, "already exists");
        require(_age > 0, "must have an age>0");

        people.push(Person(_name, _age, _birthday, _status));
        person[msg.sender] = people[people.length - 1];
    }

    function getPeople() public view returns (Person[] memory) {
        return people;
    }

    function getBalance() external view returns (uint256) {
        return payable(address(this)).balance;
    }

    function getTwoValues(string calldata _val1, uint256 _val2)
        external
        pure
        returns (string calldata val1, uint256 val2)
    {
        val1 = _val1;
        val2 = _val2;
    }

    receive() external payable {}
}
