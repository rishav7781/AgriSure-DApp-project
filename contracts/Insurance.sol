// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Insurance {
    // Struct to hold crop insurance details
    struct Crop {
        string cropName;
        uint sumInsured;
        uint premiumPaid;
        bool isInsured;
    }

    // Mapping farmer address to their crop details
    mapping(address => Crop) public cropDetails;

    // Mapping to track insured amount per farmer
    mapping(address => uint) public insuredAmount;

    // Event to log insurance purchase
    event Insured(address indexed farmer, uint amount);

    // Function to insure a crop
    function insureCrop(string memory _cropName, uint _sumInsured) public payable {
        require(msg.value > 0, "Premium must be > 0");
        
        // Update mappings
        insuredAmount[msg.sender] += msg.value;
        cropDetails[msg.sender] = Crop(_cropName, _sumInsured, msg.value, true);

        // Emit event
        emit Insured(msg.sender, msg.value);
    }

    // Function to check contract balance
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
}

