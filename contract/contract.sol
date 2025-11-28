//s SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HousingRegister {

    // Structure to store each house info
    struct House {
        uint id;
        string location;
        uint price;
        address owner;
    }

    // Array to store all houses
    House[] public houses;

    // Event for newly added house
    event HouseAdded(uint id, string location, uint price, address owner);

    // Add a new house to the register
    function addHouse(string memory _location, uint _price) public {
        uint houseId = houses.length;

        houses.push(
            House({
                id: houseId,
                location: _location,
                price: _price,
                owner: msg.sender
            })
        );

        emit HouseAdded(houseId, _location, _price, msg.sender);
    }

    // Get total number of houses
    function getHouseCount() public view returns (uint) {
        return houses.length;
    }

    // Get details of a single house
    function getHouse(uint _id) public view returns (string memory, uint, address) {
        require(_id < houses.length, "House does not exist");
        House memory h = houses[_id];
        return (h.location, h.price, h.owner);
    }
}
