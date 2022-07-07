import Nullstack from 'nullstack'

class MyNFTs extends Nullstack {
  _nfts = []
  loading = true

  async hydrate() {
    this.loading = true
    this._nfts = await this.loadNFTs() || []
    this.loading = false
  }

  async loadNFTs({ _wallet, _allNFTs }) {
    return _allNFTs.filter(nft =>nft.owner === _wallet.address);
  }

  listNFT({ router, nft }) {
    router.url = `/resell-nft?id=${nft.tokenId}&tokenUri=${nft.tokenUri}`
  }

  render() {
    if (this.loading === false && !this._nfts.length)
      return <h1 class="py-10 px-20 text-3xl">No NFTs owned</h1>
    return (
      <div class="flex justify-center">
        <div class="p-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
            {this._nfts.map((nft) => (
              <div class="border p-2 overflow-hidden">
                <img class="w-full h-[150px]" src={nft.imageUrl} alt={nft.name} />
                <div class="p-4 bg-black">
                  <span>Price</span>
                  <p class="text-2xl font-bold text-white">{nft.price} ETH</p>
                  <button
                    class="mt-4 w-full bg-mustard text-black font-bold py-2 px-12 rounded"
                    onclick={() => this.listNFT({ nft })}
                  >
                    List
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default MyNFTs