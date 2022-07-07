import Nullstack from 'nullstack';
import ipfs from '../lib/ipfs';
import NFTManager from '../lib/NFTManager';

class Home extends Nullstack {
  wallet = {
    balance: "",
    address: '',
    provider: null,
    signer: null,
    isAdmin: false,
  };
  
  name = '';
  description = '';
  price = '';
  url = '';
  urlDonate = '';
  market = {
    allNFTs: []
  }
  kidWallet = ''

  prepare({ project, page }) {
    page.title = `${project.name} - Welcome to Nullstack!`;
    page.description = `${project.name} was made with Nullstack`;
  }

  async hydrate() {
    if (NFTManager.isConnected()) {
      this.connectWallet();
    }
    this.market.allNFTs = await NFTManager.fetchAllNFTs();
  }

  async connectWallet() {
    const wallet = await NFTManager.connectWallet();
    this.wallet.balance = wallet.balance;
    this.wallet.address = wallet.address;
    this.wallet.signer = wallet.signer;
    this.wallet.isAdmin = wallet.isAdmin;
    this.wallet.contractToken = wallet.contractToken;
  }

  async disconnectWallet() {
    NFTManager.clearCookieWallet();
    this.wallet = {
      balance: "",
      address: '',
      provider: null,
      signer: null,
      isAdmin: false,
    };
    this.market.allNFTs = await NFTManager.fetchAllNFTs();
  }

  async setKidToDonate() {
    await NFTManager.setKidToDonate(this.wallet.signer, this.kidWallet);
  }

  async onChange({ ipfsClient, event }) {
    const file = event.target.files[0];
    this.url = await ipfs.addFile(ipfsClient, file);
  }

  async onChangeDonate({ ipfsClient, event }) {
    const file = event.target.files[0]
    this.urlDonate = await ipfs.addFile(ipfsClient, file);
  }

  async uploadNFT({ ipfsClient }) {
    this.url = await ipfs.uploadToIPFS(ipfsClient, this.name, this.description, this.price, this.url);
  }

  async uploadNFTDonate({ ipfsClient }) {
    this.urlDonate = await ipfs.uploadToIPFS(ipfsClient, this.name, this.description, this.price, this.urlDonate)
  }

  async mintNFT() {
    await this.uploadNFT();
    await this.uploadNFTDonate();
    this.market.allNFTs = await NFTManager.mintNFT(
      {
        signer: this.wallet.signer,
        url: this.url,
        name: this.name,
        description: this.description,
        price: this.price,
        urlDonate: this.urlDonate,
        nameDonate: this.name + 'Donate',
        descriptionDonate: this.description + 'Donate',
      }
    );
  }

  async buyToken() {

    if (!NFTManager.isConnected()) {
      await this.connectWallet()
    }
  
    this.wallet.balance = await NFTManager.buyToken(this.wallet.signer, this.wallet.address)
  }

  async buyNFT({ data: { tokenURI } }) {
    if (!NFTManager.isConnected()) {
      await this.connectWallet();
    }
    this.market.allNFTs = await NFTManager.buyNFT(this.wallet.contractToken, this.wallet.signer, tokenURI)
  }

  render() {
    return (
      <div style="display: flex; flex-direction: column">
        <div style="">
          <div style="display: flex; flex-direction: column;">
            <b>{this.wallet.balance}</b>
            <b>{this.wallet.address}</b>
          </div>
          <br />
          {this.wallet.address && <button onclick={this.disconnectWallet}>Disconnect Wallet</button>}
          {!this.wallet.address && <button onclick={this.connectWallet}>Connect Wallet</button>}
          {<button onclick={this.buyToken}>Buy token</button>}
        </div>
        {this.wallet.address && this.wallet.isAdmin && (
          <div>
            <br />
            <div style="display: flex; flex-direction: column; width: 600px;">
              <input
                placeholder="Asset Name" bind={this.name}
              />
              <br />
              <textarea class="text-black"
                placeholder="Asset Description" bind={this.description}
              />
              <br />
              <input type={'number'} class="text-black"
                placeholder="Asset Price in Eth"
                bind={this.price}
              />
              <br />
              <input
                type="file"
                name="Asset"
                onchange={this.onChange}
              />
              {
                this.url && (
                  <img className="rounded mt-4" style="width: 220px; height: 220px;" src={this.url} />
                )
              }
              <br />
              <input
                type="file"
                name="Asset"
                onchange={this.onChangeDonate}
              />
              {
                this.urlDonate && (
                  <img className="rounded mt-4" style="width: 220px; height: 220px;" src={this.urlDonate} />
                )
              }
              <br />
              <button onclick={this.mintNFT} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
                Mint NFT
              </button>
            </div>
          </div>
        )}
        {this.wallet.address && this.wallet.isAdmin && (
          <div>
            <br />
            <input
              placeholder="Kid Wallet" bind={this.kidWallet}
            />
            <button onclick={this.setKidToDonate} className="font-bold mt-4 bg-pink-500 text-white rounded p-4 shadow-lg">
              set Kid Wallet
            </button>
            <br /><br />
          </div>
        )}
        <div>
          total {this.market.allNFTs?.length}
          {this.market?.allNFTs.map(nft => {
            return (
              <div style="display: flex; flex-direction: col">
                <div><img src={nft.imageUrl} style="width: 220px; height: 220px;" /></div>
                <div><img src={nft.donate.imageUrl} style="width: 220px; height: 220px;" />
                <button onclick={this.buyNFT} data={{ tokenURI: nft.tokenURI }}>
                  Buy NFT
                </button></div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

}

export default Home;