import Nullstack from 'nullstack';
import './Home.css';
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import {
  donationNFTAddress, donationTokenAddress
} from '../config';
import DonationNFT from '../artifacts/contracts/DonationNFT.sol/DonationNFT.json'
import DonationToken from './artifacts/contracts/DonationToken.sol/DonationToken.json'
import Cookies from 'js-cookie';

const WALLWET_ADDRESS = `WALLWET_ADDRESS`;

class Home extends Nullstack {
  wallet = {
    balance: "",
    walletAddress: '',
    provider: null,
    signer: null,
  };
  name = '';
  description = '';
  price = '';
  url = '';
  urlDonate = '';
  market = {
    allNFTs: []
  };

  prepare({ project, page }) {
    page.title = `${project.name} - Welcome to Nullstack!`;
    page.description = `${project.name} was made with Nullstack`;
  }

  async hydrate() {
    console.log('hydrate')

    if(Cookies.get(WALLWET_ADDRESS)){
      await this.connectWallet();
      await this.fetchAllNFTs();
    }
  }

  async fetchAllNFTs() {
    const contractNFT = new ethers.Contract(donationNFTAddress, DonationNFT.abi, this.wallet.signer)
    const allNFTs =  await contractNFT.getAllNFTs()
    this.market.allNFTs = [...allNFTs];
    console.log('All NFTs',allNFTs[0].tokenURI, allNFTs[0].donate.tokenURI)
  }

  renderLink({ children, href }) {
    const link = href + '?ref=create-nullstack-app';
    return (
      <a href={link} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    )
  }

  async connectWallet() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect()
    this.wallet.provider = await (new ethers.providers.Web3Provider(connection))
    this.wallet.signer = await this.wallet.provider.getSigner();
    this.wallet.address = await this.wallet.signer.getAddress();

    Cookies.set(WALLWET_ADDRESS, this.wallet.address);
    const contract = new ethers.Contract(donationTokenAddress, DonationToken.abi, this.wallet.signer)
    const currentBalance = await contract.balanceOf(this.wallet.address);
    this.wallet.balance = `${currentBalance.toString()}DN `;
  }

  async disconnectWallet() {
    Cookies.remove(WALLWET_ADDRESS);
    this.wallet= {
      balance: "",
      walletAddress: '',
      provider: null,
      signer: null
    };
  }

  async buyToken() {

    const contract = new ethers.Contract(donationTokenAddress, DonationToken.abi, this.wallet.signer)
    const price = ethers.utils.parseUnits("0.1", 'ether')   
    const transaction = await contract.purchase(1, {
      value: price
    })
    await transaction.wait()
    const currentBalance = await contract.balanceOf(this.wallet.address);
    this.wallet.balance = `${currentBalance.toString()}DN `;
  }

  async buyNFT() {

  }

  async mintNFT(){
    // await this.upload()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    console.log(await signer.getAddress())
    /* create the NFT */
    let contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, signer)
    console.log(this.url, this.urlDonate)
    const transaction = await contract.setNFTToSale(this.url, this.urlDonate)
    console.log(await transaction.wait())

    // let listingPrice = await contract.getListingPrice()
    // listingPrice = listingPrice.toString()
    // let transaction = await contract.createToken(url, price, { value: listingPrice })
    // await transaction.wait()
  }

  async onChange({ ipfsClient, event }) {
    const file = event.target.files[0]
    try {
      const added = await ipfsClient.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      this.url =  `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(this.url)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async onChangeDonate({ ipfsClient, event }) {
    const file = event.target.files[0]
    try {
      const added = await ipfsClient.add(
        file,
        {
          progress: (prog) => console.log(`received: ${prog}`)
        }
      )
      this.urlDonate =  `https://ipfs.infura.io/ipfs/${added.path}`
      console.log(this.urlDonate)
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async upload() {
    console.log(1)
    await this.uploadToIPFS();
    console.log(2)
    await this.uploadToIPFSDonate();
  }
  async uploadToIPFS({ ipfsClient }) {
    console.log(this.name ,this.description ,this.price ,this.url)
    if (!this.name || !this.description || !this.price || !this.url) return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name: this.name, description: this.description, image: this.url
    })
    try {
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      this.url = url;
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  async uploadToIPFSDonate({ ipfsClient }) {
    console.log(this.name ,this.description ,this.price ,this.url)
    if (!this.name || !this.description || !this.price || !this.urlDonate) return
    /* first, upload metadata to IPFS */
    const data = JSON.stringify({
      name: `${this.name} - Donate`, description: this.description, image: this.urlDonate
    })
    try {
      const added = await ipfsClient.add(data)
      const url = `https://ipfs.infura.io/ipfs/${added.path}`
      /* after metadata is uploaded to IPFS, return the URL to use it in the transaction */
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }  
  }

  render({ project }) {
    return (
      <div style="display: flex; flex-direction: column">
          <div>
            <b>{this.wallet.balance}</b>
            <b>{this.wallet.address}</b>
            {this.wallet.address && <button onclick={this.disconnectWallet}>Disconnect Wallet</button>}
            {!this.wallet.address && <button onclick={this.connectWallet}>Connect Wallet</button>}
            {this.wallet.address && <button onclick={this.buyToken}>Buy token</button>}
            {this.wallet.address && <button onclick={this.buyNFT}>Buy NFT</button>}
          </div>
        <div>
          {this.wallet.address && (
            <div className="flex justify-center">
            <div className="w-1/2 flex flex-col pb-12">
              <input 
                placeholder="Asset Name" bind={this.name}
              />
              <textarea
                placeholder="Asset Description" bind={this.description}
              />
              <input type={'number'}
                placeholder="Asset Price in Eth"
                bind={this.price}
              />
              <input
                type="file"
                name="Asset"
                onchange={this.onChange}
              />
              {
                this.url && (
                  <img className="rounded mt-4" width="350" src={this.url} />
                )
              }
              <input
                type="file"
                name="Asset"
                onchange={this.onChangeDonate}
              />
              {
                this.urlDonate && (
                  <img className="rounded mt-4" width="350" src={this.urlDonate} />
                )
              }
              <button onclick={this.mintNFT} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Mint NFT
              </button>
            </div>
          </div>
          )}
        </div>
        <div>
          {this.market.allNFTs.length && <img src={this.market.allNFTs[0]?.tokenURI} style="width: 220px; height: 220px;"/>}
          {this.market.allNFTs.length && <img src={this.market.allNFTs[0]?.donate?.tokenURI} style="width: 220px; height: 220px;"/>}
          <button onclick={this.mintNFT} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
            Buy NFT
          </button>
        </div>
        
      </div>
    )
  }

}

export default Home;

// // const provider = new ethers.providers.JsonRpcProvider();
//     // const contract = new ethers.Contract(donationNFTAddress, DonationNFT.abi, provider)
//     // const data = await contract.fetchAllNFTS();
//     // this.minted2 = data;
//     try{

//       // console.log(1);
//       // const web3Modal = new Web3Modal();
//       // console.log(2);
//       // const connection = await web3Modal.connect();
//       // console.log(3)
//       // alert(3)
//       // const provider = new ethers.providers.Web3Provider(connection)
//       // alert(4)
//       // const signer = provider.getSigner()
//       // alert(5)
//       // const contract = new ethers.Contract(donationTokenAddress, DonationToken.abi, signer);
//       // alert(6)
//       // const balance = await contract.balanceOf(signer);
//       // alert(balance)
//     }catch(e){
//       console.log(e)
//     }
  
      // /* user will be prompted to pay the asking proces to complete the transaction */
      // const price = ethers.utils.parseUnits(nft.price.toString(), 'ether')   
      // const transaction = await contract.createMarketSale(nft.tokenId, {
      //   value: price
      // })
      // await transaction.wait()

       

      // const price = ethers.utils.parseUnits("0.1", 'ether')   
      // const transaction = await contract.purchase(1, {
      //   value: price
      // })
      // console.log( await transaction.wait().catch(e => e.message))