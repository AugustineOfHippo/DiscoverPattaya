// SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract DiscoverPattaya  {
   address payable owner;
   IERC20 public token;
   uint256 scubaPrice = 100 * (10 **18);
   uint activityId = 0;

   constructor(IERC20 _tokenAddress){
    owner = payable(msg.sender);
    token = _tokenAddress;
   }

   struct Activity {
        uint256 id;
        string name;
        uint timeBooked;
        uint expiresDate;
    }

    struct Client {
        address wallet;
        string email;
        string fullName;
        string phoneNumber;
    }

    Client[] private allClients;
    Activity[] private allActivities;
    mapping(address => Activity[]) clientActivities;
    mapping(address => Client) clients;

    // Register New Client
   function newClient(address _wallet, string memory _email, string memory _fullName, string memory _phoneNumber) public {
        require(clients[msg.sender].wallet != msg.sender, "You already have an account");
        clients[msg.sender] = Client(_wallet,_email,_fullName,_phoneNumber);
   }

   modifier onlyOwner(){
    require(msg.sender == owner,"You are not the owner sorry");
    _;
   }

    // Get Client By Address
   function getClientByAddress(address _wallet) view public returns(Client memory){
    return clients[_wallet];
   }

    // Get Activity By Address
   function getActivityByAddress(address _wallet) view public returns(Activity[] memory){
    return clientActivities[_wallet];
   }

   // Get All Activities
   function getAllActivites() view private onlyOwner returns(Activity[] memory){
    return allActivities;
   }

    // Client Books Scuba Dive Session
   function bookScuba() public payable{
        require(token.balanceOf(msg.sender) >= scubaPrice,"You dont have enough funds");
        require(clients[msg.sender].wallet == msg.sender,"You need an account" );
        

        token.transferFrom(msg.sender,address(this),scubaPrice);
        clientActivities[msg.sender].push(Activity(activityId,"Scuba",block.timestamp,block.timestamp + 172800));
        allActivities.push(Activity(activityId,"Scuba",block.timestamp,block.timestamp + 172800));
        activityId++;
   }


}