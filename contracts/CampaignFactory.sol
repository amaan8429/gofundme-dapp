// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract CampaignFactory {
    address[] public deployedCampaigns;

    event CampaignCreated(
        string title,
        uint requiredAmount,
        address indexed owner,
        address campaignAddress,
        uint indexed timestamp,
        string indexed category
    );

    function createCampaign(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory category,
        string memory campaignStory
    ) public {
        Campaign newCampaign = new Campaign(
            campaignTitle, 
            requiredCampaignAmount, 
            campaignStory, 
            msg.sender
        );

        deployedCampaigns.push(address(newCampaign));
        
        emit CampaignCreated(
            campaignTitle,
            requiredCampaignAmount,
            msg.sender,
            address(newCampaign),
            block.timestamp,
            category
        );
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract Campaign {
    string public title;
    uint public requiredAmount;
    string public story;
    address payable public owner;
    uint public receivedAmount;

    event Donated(address indexed donor, uint indexed amount, uint indexed timestamp);

    constructor(
        string memory campaignTitle,
        uint requiredCampaignAmount,
        string memory campaignStory,
        address campaignOwner
    ) {
        title = campaignTitle;
        requiredAmount = requiredCampaignAmount;
        story = campaignStory;
        owner = payable(campaignOwner);
    }

    function donate() public payable {
        require(receivedAmount + msg.value <= requiredAmount, "Campaign funding limit reached");
        
        // Transfer funds to campaign owner
        (bool success, ) = owner.call{value: msg.value}("");
        require(success, "Transfer failed");

        receivedAmount += msg.value;
        
        emit Donated(msg.sender, msg.value, block.timestamp);
    }

    function getDetails() public view returns (
        string memory, 
        uint, 
        string memory, 
        address, 
        uint
    ) {
        return (
            title,
            requiredAmount,
            story,
            owner,
            receivedAmount
        );
    }
}