import Nullstack from 'nullstack'

class CreateNFT extends Nullstack {
  name = ''
  description = ''
  price = ''
  fileUrl = ''

  async uploadImageToIPFS({ settings, ipfsClient, event }) {
    const file = event.target.files[0]
    try {
      const added = await ipfsClient.add(file, {
        progress: (prog) => console.log(`received: ${prog}`),
      })
      this.fileUrl = `${settings.ipfsUrl}/${added.path}`
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async uploadToIPFS({ settings, ipfsClient }) {
    const { name, description, price, fileUrl } = this
    if (!name || !description || !price || !fileUrl) return
    const data = JSON.stringify({
      name,
      description,
      image: fileUrl,
    })
    try {
      const added = await ipfsClient.add(data)
      const url = `${settings.ipfsUrl}/${added.path}`
      return url
    } catch (error) {
      console.log('Error uploading file: ', error)
    }
  }

  async listNFTForSale({
    router,
    _ethers: ethers,
    marketplaceAddress,
    NFTMarketplace,
    Web3Modal,
  }) {
    const url = await this.uploadToIPFS()
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    const price = ethers.utils.parseUnits(this.price, 'ether')
    const contract = new ethers.Contract(
      marketplaceAddress,
      NFTMarketplace.abi,
      signer,
    )
    const listingPrice = await contract.getListingPrice()
    const priceValue = listingPrice.toString()
    const transaction = await contract.createToken(url, price, {
      value: priceValue,
    })
    await transaction.wait()
    router.url = '/'
  }

  async testForm() {
    const { name, description, price, fileUrl } = this
    console.log({ name, description, price, fileUrl })
  }

  render() {
    return (
      <div class="flex justify-center">
        <div class="w-1/2 flex flex-col pb-12">
          <input
            placeholder="Asset Name"
            class="mt-8 border rounded p-4 text-black"
            bind={this.name}
          />
          <textarea
            placeholder="Asset Description"
            class="mt-2 border rounded p-4 text-black"
            bind={this.description}
          />
          <input
            placeholder="Asset Price in ETH"
            class="mt-2 border rounded p-4 text-black"
            bind={this.price}
          />
          <input
            type="file"
            name="Asset"
            class="my-4"
            oninput={this.uploadImageToIPFS}
          />
          {this.fileUrl && (
            <img class="rounded mt-4" width="350" src={this.fileUrl} />
          )}
          <button
            onclick={this.listNFTForSale}
            class="font-bold mt-4 bg-mustard text-black rounded p-4 shadow-lg"
          >
            Create NFT
          </button>
        </div>
      </div>
    )
  }
}

export default CreateNFT