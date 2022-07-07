import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import {
  donationNFTAddress, donationTokenAddress
} from '../../config';
import DonationNFT from '../../artifacts/contracts/DonationNFT.sol/DonationNFT.json'
import DonationToken from '../../artifacts/contracts/DonationToken.sol/DonationToken.json'
import axios from 'axios';
import Cookies from 'js-cookie';

const WALLWET_ADDRESS = `WALLWET_ADDRESS`;

async function fetchAllNFTs() {
  const provider = new ethers.providers.JsonRpcProvider()
  const contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, provider);
  const allNFTs = await contract.getAllNFTs();
  return [...(await Promise.all(allNFTs.map(async nft => {
    return {
      ...nft, imageUrl: (await axios.get(nft.tokenURI)).data.image, donate: {
        ...nft.donate,
        imageUrl: (await axios.get(nft.donate.tokenURI)).data.image
      }
    }
  })))];
}

async function connectWallet(context) {
  const web3Modal = new Web3Modal();
  const connection = await web3Modal.connect()

  const providerToken = await (new ethers.providers.Web3Provider(connection))
  const signer = await providerToken.getSigner();
  const address = await signer.getAddress();

  Cookies.set(WALLWET_ADDRESS, address);

  const contractToken = new ethers.Contract(donationTokenAddress, DonationToken.abi, signer);
  const currentBalance = await contractToken.balanceOf(address);

  const providerNFT = new ethers.providers.JsonRpcProvider()
  const contractNFT = new ethers.Contract(donationNFTAddress, DonationNFT.abi, providerNFT);
  const isAdmin = address === await contractNFT.admin();

  return {
    balance: currentBalance.toString(),
    address,
    label: `${address.substring(0,7)}...${address.substring(35,42)}`,
    signer,
    isAdmin,
    contractToken,
    isConnected: true
  };
}
function clearCookieWallet() {
  Cookies.remove(WALLWET_ADDRESS);
}

async function buyToken(wallet, amount) {
  const { signer, address } = wallet;
  const contract = new ethers.Contract(donationTokenAddress, DonationToken.abi, signer)
  const price = ethers.utils.parseUnits(`${0.1 * amount}`, 'ether')
  const transaction = await contract.purchase(amount, {
    value: price
  })
  await transaction.wait()
  const currentBalance = await contract.balanceOf(address);

  return currentBalance.toString();
}

async function buyNFT(contractToken, signer, tokenURI) {

  await contractToken.approve(donationNFTAddress, 1);

  const contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, signer);
  const transaction = await contract.purchase(tokenURI);
  await transaction.wait();

  await this.fetchAllNFTs();
}

async function mintNFT({
  signer, url, name, description, price, urlDonate, nameDonate, descriptionDonate
}) {
  const contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, signer);
  const transaction = await contract.setNFTToSale(
    url,
    name,
    description,
    price,
    urlDonate,
    nameDonate,
    descriptionDonate)
  await transaction.wait()
  return fetchAllNFTs();
}

async function setKidToDonate(signer, kidWallet) {
  const contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, signer);
  const transaction = await contract.setKidToDonate(kidWallet);
  await transaction.wait();
}

function isConnected() {
  return Boolean(Cookies.get(WALLWET_ADDRESS));
}

export default {
  fetchAllNFTs,
  connectWallet,
  buyToken,
  buyNFT,
  mintNFT,
  setKidToDonate,
  isConnected,
  clearCookieWallet
}