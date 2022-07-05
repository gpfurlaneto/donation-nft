pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

import "hardhat/console.sol";

contract DonationToken is ERC20 {

  address payable public admin;

  constructor() ERC20("Donation Token", "DN"){
      admin = payable(msg.sender);
  }

  modifier onlyAdmin {
    require(msg.sender == admin, "Error: Only admin");
    _;
   }

  function purchase(uint amount) external payable{
    require(msg.value >= amount * 0.1 ether);
    _mint(msg.sender, amount);
  }

  function withdraw() external onlyAdmin {
    admin.transfer(address(this).balance);
    console.log(1);
  }
}