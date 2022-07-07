import Nullstack from 'nullstack'
import WalletIcon from '../icons/wallet'
import GreatPowerFooter from '../layout/greatPowerFooter'
import LandingPageLayout from '../layout/LandingPageLayout'
import Title from '../layout/title'
import NFTManager from '../lib/NFTManager'

class WTF extends Nullstack {
  
  async connectWallet(context) {
    context._wallet = await NFTManager.connectWallet(context);
  }

  renderTopContent() {
    return (
      <section class="m-auto mb-48 flex mt-32 flex-col justify-center text-center">
        <Title
          breakLine={true}
          text={<>Treat your charity<br />like your investments</>}
          highlightedText="- Expect ROI"
        />
        <p class="mb-10 mx-auto">
          Bringing attention to effective altruism,<br />and reminding you that not
          all charities are created equal
        </p>
        <button class="m-auto w-60 bg-mustard p-3 font-extrabold text-black" onclick={this.connectWallet}>
          <div class="flex items-center justify-center">
            <WalletIcon /> <span class="ml-3">Connect your wallet</span>
          </div>
        </button>
      </section>
    )
  }

  renderMiddleContent() {
    return (
      <section>
        <div class="m-auto flex w-[500px] flex-col justify-center gap-5 text-center">
          <Title text={<>Giving to charities<br />that count</>} />
          <p>
            Some “charities” manipulate emotions with imagery. This helps
            fundraiser, but not necessarily those in need. Treat your charity
            like any other investment. Verify that your hard-earned money
            benefits those in greatest need. Know what percentage of each
            donation is retained vs. distributed!
          </p>
          <p>
            This project brings awareness to the issue of inefficient charities
            that keep most of the funds they raise internally. Let's help
            altruistic people give to the most efficient, effective charities!
          </p>
          <p>
            Note: All monetary proceeds from this project will be donated to
            charities deemed effective by GiveWell.
          </p>
          <a
            href="https://www.givingwhatwecan.org/best-charities-to-donate-to-2022"
            class="m-auto w-64 bg-mustard p-2 text-center font-extrabold text-black"
          >
            Givin what we can
          </a>
        </div>
      </section>
    )
  }

  render() {
    return (
      <LandingPageLayout preFooter={ <GreatPowerFooter />}>
        <TopContent />
        <MiddleContent/>
      </LandingPageLayout >
    )
  }
}

export default WTF