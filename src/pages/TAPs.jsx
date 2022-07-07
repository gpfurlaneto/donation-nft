import Nullstack from 'nullstack'
import TapIcon from '../icons/tap'
import WalletIcon from '../icons/wallet'
import GreatPowerFooter from '../layout/greatPowerFooter'
import Title from '../layout/title'
import NFTManager from '../lib/NFTManager'
import LandingPageLayout from '../layout/LandingPageLayout'

class TAPs extends Nullstack {

  tapToBuy = "0";

  async connectWallet(context) {
    context._wallet = await NFTManager.connectWallet(context);
  }

  async buyToken(context) {
    const balance = await NFTManager.buyToken(context._wallet, this.tapToBuy);
    context._wallet = {
      ...context._wallet,
      balance
    }
  }

  renderTopContent({ _wallet }) {
    return (
      <section class="m-auto mb-48 flex w-80 flex-col justify-center text-center">
        <h2 class="text-2xl font-extrabold shadow-white drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]">
          Meet our token
        </h2>
        <p class="mb-6 mt-3 bg-mustard p-2 text-2xl font-extrabold text-black shadow-black drop-shadow-none">
          Toughts and Prayers
        </p>
        <p class="mb-10">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        {!_wallet?.isConnected && (
          <button class="m-auto w-60 bg-mustard p-3 font-extrabold text-black" onclick={this.connectWallet}>
            <div class="flex items-center justify-center">
              <WalletIcon /> <span class="ml-3">Connect your wallet</span>
            </div>
          </button>
        )}
      </section>
    )
  }

  renderBuyTap({ _wallet, allNFTs }) {
    return (
      <section>
        <div class="m-auto w-[500px] text-center mb-48">
          <Title text="Buy TAPs" />
          <div class="flex flex-col gap-3 border border-gray-800 bg-black p-10">
            <div class="relative">
              <input type="number" bind={this.tapToBuy}
                 class="w-full border border-white bg-black p-2 pr-20 text-2xl font-extrabold text-white"
              />
              <span class="absolute right-4 top-4 flex items-center justify-center gap-2 text-sm">
                <TapIcon /> TAPs
              </span>
            </div>
            {!_wallet?.isConnected && <button class="m-auto w-60 bg-mustard p-3 font-extrabold text-black"  onclick={this.connectWallet}>
              <div class="flex items-center justify-center">
                <WalletIcon /> <span class="ml-3">Connect your wallet</span>
              </div>
            </button>}
            {_wallet?.isConnected && <button class="m-auto w-60 bg-mustard p-3 font-extrabold text-black"  onclick={this.buyToken}>
              <div class="flex items-center justify-center">
                <span class="ml-3">Buy</span>
              </div>
            </button>}
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <LandingPageLayout preFooter={ <GreatPowerFooter />}>
        <TopContent />
        <BuyTap />
      </LandingPageLayout>
    )
  }
}

export default TAPs
