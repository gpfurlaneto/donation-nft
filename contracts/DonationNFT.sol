pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


import "./DonationToken.sol";
import "hardhat/console.sol";

contract DonationNFT is ERC721URIStorage {

  address payable public admin;
  address public kidToDonate;
  address donationTokenAddress;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(string => MainNFT) public tokenURIByNFT;
  MainNFT[] public allNFTs;
  mapping(string => uint) public indexOf;

  struct DonateNFT {
    uint256 tokenId;
    string tokenURI;
    address owner;
    string name;
    string description;
  }

  struct MainNFT {
    uint256 tokenId;
    string tokenURI;
    address owner;
    string name;
    string description;
    uint256 price;
    DonateNFT donate;
  }

  event TokenPurchased(address indexed to, uint tokenId);

  constructor(address _donationTokenAddress) ERC721("DonationNFT", "DON") {
    donationTokenAddress = _donationTokenAddress;
    admin = payable(msg.sender);
  }

  function _mint(string memory _tokenURI, address to) private returns(uint){
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(to, newItemId);
    _setTokenURI(newItemId, _tokenURI);
    emit TokenPurchased(to, newItemId);
    return newItemId;
  }

  function purchase(string memory _tokenURI) external payable {
    MainNFT storage nft = tokenURIByNFT[_tokenURI];
    DonationToken token = DonationToken(donationTokenAddress);
    token.transferFrom(msg.sender, admin, nft.price);
    
    uint idMain = _mint(_tokenURI, msg.sender);
    nft.tokenId = idMain;
    nft.owner = msg.sender;

    uint idDonate = _mint(nft.donate.tokenURI, kidToDonate);
    nft.donate.tokenId = idDonate;
    nft.donate.owner = kidToDonate;

    tokenURIByNFT[_tokenURI] = nft;
    allNFTs[indexOf[_tokenURI]] = nft;
    
  }

  function setNFTToSale(
    string memory _tokenURI, 
    string memory _name,
    string memory _description,
    uint256 _price,
    string memory _tokenURIToDonate,
    string memory _nameDonate,
    string memory _descriptionDonate) external  {
    tokenURIByNFT[_tokenURI] = MainNFT(
      0,
      _tokenURI,
      address(0),
      _name,
      _description,
      _price,
      DonateNFT(
        0,
        _tokenURIToDonate,
        address(0),
        _nameDonate,
        _descriptionDonate
      )
    );
    allNFTs.push(tokenURIByNFT[_tokenURI]);
    indexOf[_tokenURI] = allNFTs.length -1;
  }

  function setKidToDonate(address _kidToDonate) external {
    require(msg.sender == admin);
    kidToDonate = _kidToDonate;
  }

  function getAllNFTs() public view returns(MainNFT[] memory) {
    return allNFTs;
  }

}

