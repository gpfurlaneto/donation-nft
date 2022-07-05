pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";


import "./DonationToken.sol";
import "hardhat/console.sol";

contract DonationNFT is ERC721URIStorage {

  address payable public admin;
  address public kidToDonate;
  address donationTokenAddress;
  uint256 price = 1;
  using Counters for Counters.Counter;
  Counters.Counter private _tokenIds;
  mapping(string => MainNFT) public tokenURIByNFT;
  MainNFT[] public allNFTs;
  mapping(string => uint) public indexOf;

  struct DonateNFT {
    uint256 tokenId;
    string tokenURI;
  }

  struct MainNFT {
    uint256 tokenId;
    string tokenURI;
    bool sold;
    DonateNFT donate;
  }

  event PurchaseToken(address indexed to, uint tokenId);

  constructor(address _donationTokenAddress) ERC721("DonationNFT", "DON") {
    donationTokenAddress = _donationTokenAddress;
    admin = payable(msg.sender);
  }

  function _mint(string memory _tokenURI, address to) private returns(uint){
    _tokenIds.increment();
    uint256 newItemId = _tokenIds.current();
    _safeMint(to, newItemId);
    _setTokenURI(newItemId, _tokenURI);
    emit PurchaseToken(to, newItemId);
    return newItemId;
  }

  function purchase(string memory _tokenURI) external payable {
    MainNFT storage nft = tokenURIByNFT[_tokenURI];
    DonationToken token = DonationToken(donationTokenAddress);
    token.transferFrom(msg.sender, admin, price);
    
    uint idMain = _mint(_tokenURI, msg.sender);
    nft.tokenId = idMain;
    nft.sold = true;

    uint idDonate = _mint(nft.donate.tokenURI, kidToDonate);
    nft.donate.tokenId = idDonate;

    tokenURIByNFT[_tokenURI] = nft;
    allNFTs[indexOf[_tokenURI]] = nft;
    
  }

  // function fetchAllNFTS() public view returns (MainNFT[] memory) {
    // ret
    // MainNFT[] memory items = new MainNFT[](_tokenIds.current() / 2);
    // uint256 index = 0;
    // for (uint i = 1; i <= _tokenIds.current(); i++) {
    //   if(i % 2 != 0) {
    //     items[index] = MainNFT(
    //       i,
    //       tokenURI(i),
    //       DonateNFT(i+1,tokenURI(i+1))
    //     );
    //   }
    //   index++;
    // }
    // return items;
  // }

  function setNFTToSale(string memory _tokenURI, string memory _tokenURIToDonate) external  {
    tokenURIByNFT[_tokenURI] = MainNFT(
      0,
      _tokenURI,
      false,
      DonateNFT(
        0,
        _tokenURIToDonate
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

