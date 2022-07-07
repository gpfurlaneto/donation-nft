const { expect } = require("chai");
const { BigNumber } = require("ethers");
const { ethers } = require("hardhat");

describe("Donation NFT", function() {
  it("Should but a NFT using the token", async function() {
    
    const [, buyerAddress, kidToDonate] = await ethers.getSigners();
    const DonationToken = await ethers.getContractFactory("DonationToken")
    const donationToken = await DonationToken.deploy();
    await donationToken.deployed();

    const DonationNFT = await ethers.getContractFactory("DonationNFT");
    const donationNFT = await DonationNFT.deploy(donationToken.address);  
    await donationNFT.deployed();

    const price = 1;

    await donationNFT .setKidToDonate(kidToDonate.address);
    await donationNFT.setNFTToSale(
      'myTokenURI',
      'MainNFTName',
      'MainNFTDescription',
      price,
      'myTokenURIToDonate',
      'DonateNFTName',
      'DonateNFTDescription'
    );

    const auctionPrice = ethers.utils.parseUnits('1', 'ether')
    const balanceExpected = 10;
    
    await donationToken.connect(buyerAddress).purchase(balanceExpected, { value: auctionPrice });
    const balance = await donationToken.balanceOf(buyerAddress.address);
    expect(balance).to.equal(balanceExpected);

    await donationToken.connect(buyerAddress).approve(donationNFT.address, 2);

    const tx = await donationNFT.connect(buyerAddress).purchase('myTokenURI');
    const events = (await tx.wait()).events.filter(e => e.event === 'TokenPurchased')
    expect(events.length).to.equal(2);

    const eventBuyer = events[0]
    expect(eventBuyer.args[0], buyerAddress.address);
    expect(eventBuyer.args[1], 1);

    const eventKidToDonate = events[1]
    expect(eventKidToDonate.args[0], kidToDonate.address);
    expect(eventKidToDonate.args[1], price);

    const allNFTs = await donationNFT.getAllNFTs();
    expect(allNFTs.length).to.equal(1);
    expect(allNFTs[0].tokenId).to.equal(1);
    expect(allNFTs[0].tokenURI).to.equal('myTokenURI');
    expect(allNFTs[0].name).to.equal('MainNFTName');
    expect(allNFTs[0].description).to.equal('MainNFTDescription');
    expect(allNFTs[0].price).to.equal(price);
    expect(allNFTs[0].owner).to.equal(buyerAddress.address);
    expect(allNFTs[0].donate.tokenId).to.equal(2);
    expect(allNFTs[0].donate.tokenURI).to.equal('myTokenURIToDonate');
    expect(allNFTs[0].donate.owner).to.equal(kidToDonate.address);
    expect(allNFTs[0].donate.name).to.equal('DonateNFTName'),
    expect(allNFTs[0].donate.description).to.equal('DonateNFTDescription');
  })
})