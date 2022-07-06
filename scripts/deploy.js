const hre = require("hardhat");
const fs = require('fs');

async function main() {
  const DonationToken = await hre.ethers.getContractFactory("DonationToken");
  const donationToken = await DonationToken.deploy();
  await donationToken.deployed();

  console.log("DonationToken deployed to:", donationToken.address);

  const DonationNFT = await hre.ethers.getContractFactory("DonationNFT");
  const donationNFT = await DonationNFT.deploy(donationToken.address);
  await donationNFT.deployed();

  console.log("DonationNFT deployed to:", donationNFT.address);

  fs.writeFileSync('./config.js', `
    export const donationTokenAddress = "${donationToken.address}";
    export const donationNFTAddress = "${donationNFT.address}";
  `);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });