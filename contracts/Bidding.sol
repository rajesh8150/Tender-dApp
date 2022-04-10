// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract Bidding{
    
    
    address payable public owner;
    address public highestbidder;
    uint256 count;

    uint256 highestbid=0;

    constructor(address payable _owner){
        owner = _owner;
    }

    function getHighestBid() public view returns (uint256) {
        return highestbid;
    }

    function bid() public payable 
    {
        if(msg.sender == owner)
        {
            revert("not available for owner ");
        }

        if(msg.sender.balance < msg.value)
        {
            revert("Insufficient balance in your account");
        }

        if(msg.value <= highestbid)
        {
            revert("There is already higher or equal bid");
        }
        
        if(highestbid!=0)
        payable(highestbidder).transfer(highestbid);

        highestbidder=msg.sender;
        highestbid=msg.value;
    }

    function endbid() public payable{
        if(msg.sender != owner)
        {
            revert("only available for owner ");
        }

        owner.transfer(highestbid);
    }

    function setcount() public
    {
        count=1;
    }

    function getcount() public view returns (uint256)
    {
        return count;
    }



}