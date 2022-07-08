import Nullstack from 'nullstack'
import LandingPageLayout from '../layout/LandingPageLayout'
import CubesDetailNFT from '../components/CubesDetailNFT'
import MagnifierIcon from '../icons/wallet'
import ButtonLink from '../layout/buttonLink'
import NFTManager from '../lib/NFTManager';

class NFTDetail extends Nullstack {

  async buyNFT(context) {
    const { _wallet, data: { tokenURI } } = context;
    if (!NFTManager.isConnected()) {
      await this.connectWallet();
    }
    context._allNFTs = await NFTManager.buyNFT(_wallet.contractToken, _wallet.signer, tokenURI)
  }

  renderTopContent({ _allNFTs }) {
    const nft = _allNFTs ? _allNFTs[0] : null
    return (
      <div class="flex justify-between max-w-[880px] mx-auto h-[900px] capitalize">
        <div class="w-[410px] flex flex-col">
          <CubesDetailNFT url1={nft?.imageUrl} url2={nft?.donate?.imageUrl}/>
          <div class="ml-6 mt-6 capitalize">
            <h2 class={`font-extrabold leading-relaxed text-xl`}>
              <span class="shadow-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
                {nft?.donate.name}
              </span>
            </h2>
            <span>Owned By:
              <span class="text-rose ml-2">
                {nft?.donate?.owner ? `${nft.donate.owner.substring(0,7)}...${nft.donate.owner.substring(35,42)}` : ''}
              </span>
            </span>
          </div>
        </div>
        <div class="flex flex-col max-w-[410px] w-[410px]">
          <h2 class={`font-extrabold leading-relaxed text-[35px]`}>
            <span class="shadow-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
              {nft?.name}
            </span>
          </h2>
          <div>
            Owned by:
              <span class="text-rose ml-2">
              {nft?.owner ? `${nft.owner.substring(0,7)}...${nft.owner.substring(35,42)}` : ''}
              </span>
          </div>
          <span class="mt-3">Price</span>
          <div class="flex flex-row text-xl font-extrabold text-white items-center">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="26" viewBox="0 0 18 26" fill="none">
              <path d="M9 25.58C6.61875 25.58 4.52344 24.6367 2.71406 22.7502C0.904687 20.8637 0 18.311 0 15.0922C0 12.9605 0.745313 10.6423 2.23594 8.13762C3.72656 5.63292 5.98125 2.92038 9 0C12.0188 2.92038 14.2734 5.63292 15.7641 8.13762C17.2547 10.6423 18 12.9605 18 15.0922C18 18.311 17.0953 20.8637 15.2859 22.7502C13.4766 24.6367 11.3813 25.58 9 25.58Z" fill="white" />
            </svg>
            <span class="ml-3">{nft?.price}</span>
          </div>
          <div class="mt-4 flex gap-2 font-extrabold">
            <button class="w-[148px] bg-mustard p-3 font-extrabold text-black" onclick={this.buyNFT} data={{ tokenURI: nft?.tokenURI }}>
              <div class="flex items-center justify-center">
                <MagnifierIcon /> <span class="ml-3">Buy now</span>
              </div>
            </button>
            <ButtonLink
              href="/taps"
              clazz="w-32 border border-rose bg-transparent text-rose"
            >
              Buy TAPs
            </ButtonLink>
          </div>
          <h2 class={`font-extrabold leading-relaxed text-xl pt-[32px] pb-[10px]`}>
            <span class="shadow-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
              Description
            </span>
          </h2>
          <span class="max-w-[496px]">
            {nft?.description}
          </span>
        </div>
      </div>
    )
  }

  render() {
    return (
      <LandingPageLayout>
        <TopContent />
      </LandingPageLayout>
    )
  }
}

export default NFTDetail