import Nullstack from 'nullstack'
import LandingPageLayout from '../layout/LandingPageLayout'
import TapIcon from '../icons/tap'

class PublicProfile extends Nullstack {
  
  async initiate({params}) {
    this.walletAddressFilter = params.walletAddressFilter;
  }

  renderNoContent() {
    return (
      <section>
        <h1 class="py-10 text-center text-3xl">No items in your wallet!</h1>
      </section>
    )
  }

  renderWallet() {
    return (
      <div class="flex flex-row my-20">
        <div class="bg-profile-yellow w-24 h-24 flex justify-center items-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="41" viewBox="0 0 30 41" fill="none">
            <path d="M15.0267 40.5326C11.2607 40.5326 7.94688 39.0552 5.08532 36.1003C2.22375 33.1455 0.792969 29.1474 0.792969 24.1058C0.792969 20.7671 1.9717 17.1361 4.32915 13.2131C6.68661 9.29004 10.2524 5.04146 15.0267 0.467346C19.8009 5.04146 23.3667 9.29004 25.7242 13.2131C28.0816 17.1361 29.2604 20.7671 29.2604 24.1058C29.2604 29.1474 27.8296 33.1455 24.968 36.1003C22.1064 39.0552 18.7927 40.5326 15.0267 40.5326Z" fill="white"/>
          </svg>
        </div>
        <div class="flex flex-row items-center m-8">
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 16C4.4125 16 3.01562 15.41 1.80938 14.23C0.603125 13.05 0 11.4533 0 9.44C0 8.10667 0.496875 6.65667 1.49063 5.09C2.48438 3.52333 3.9875 1.82667 6 0C8.0125 1.82667 9.51563 3.52333 10.5094 5.09C11.5031 6.65667 12 8.10667 12 9.44C12 11.4533 11.3969 13.05 10.1906 14.23C8.98438 15.41 7.5875 16 6 16Z" fill="white" />
          </svg>
          <span class='px-2 text-sm'>{`${this.walletAddressFilter.substring(0,7)}...${this.walletAddressFilter.substring(35,42)}`}</span>
        </div>
      </div>
    );
  }

  filterNFTs({ _allNFTs }) {
    return _allNFTs?.filter(nft => nft.owner === this.walletAddressFilter);
  }

  renderContent({ _allNFTs }) {
    const nftItems = this.filterNFTs();
    if (!nftItems?.length) return <NoContent />
    
    return (
      <section class="mb-32">
        <div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {nftItems.map((nft) => (
              <div class="overflow-hidden border bg-black p-2">
                <img src={nft.imageUrl} alt={nft.name} draggable="false" />
                <div class="mt-4">
                  <p class="text-2xl font-semibold">{nft.name}</p>
                  <div class="h-6 overflow-hidden">
                    <p class="text-white">{nft.description}</p>
                  </div>
                </div>
                <div class="mt-4">
                  <span>Price</span>
                  <div class="flex items-end justify-between">
                    <p class="flex text-2xl font-bold text-white">
                      <span class="mt-2 mr-2">
                        <TapIcon />
                      </span>
                      {nft.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <LandingPageLayout>
        <Wallet />
        <Content />
      </LandingPageLayout>
    )
  }
}

export default PublicProfile;