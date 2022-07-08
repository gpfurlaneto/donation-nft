import Nullstack from 'nullstack'
import GreatPowerFooter from '../layout/greatPowerFooter'
import LandingPageLayout from '../layout/LandingPageLayout'
import Title from '../layout/title'
import PhotoCube from '../components/PhotoCube'
import ButtonLink from '../layout/buttonLink'


class Home extends Nullstack {
  renderTopContent() {
    return (
      <div class="flex justify-between">
        <div class="mt-32 ml-14 w-96">
          <Title
            text="Your kindness can make the world of a difference for a"
            highlightedText="child's crypto wallet"
          />
          <p class="mt-4">
            They may not have food, but you can help an NFT-less child with this
            buy one, give one opportunity. Every child deserves an NFT.
          </p>
          <div class="mt-4 flex gap-2 font-extrabold">
            <ButtonLink clazz="w-32" href="/explore">Explore</ButtonLink>
            <ButtonLink
              href="/taps"
              clazz="w-32 border border-rose bg-transparent text-rose"
            >
              Buy TAPs
            </ButtonLink>
          </div>
        </div>
        <div>
          <PhotoCube />
        </div>
      </div>
    )
  }

  renderMiddleContent() {
    return (
      <section class="m-32 text-center">
        <div class="mx-auto mb-10 max-w-[380px]">
        <Title
          text="Don't let these weary children lose their"
          highlightedText="last shreds of hope"
        />
        </div>
        <div class="flex justify-between">
          <div class="flex w-72 flex-col items-center">
            <img src="/home2.png" width={200} alt="" />
            <h3 class="pt-3 mb-3 font-extrabold">Unimaginable poverty</h3>
            <p>
              There are children raised in unimaginable poverty. Not only are
              they deprived of clean water, nutritious food, reliable
              electricity and educational opportunities... but they also lack
              NFTs.
            </p>
          </div>
          <div class="flex w-72 flex-col items-center">
            <img src="/home2.png" width={'200'} alt="" />
            <h3 class="pt-3 mb-3 font-extrabold">They need you</h3>
            <p>
              Please offer your support. Even if a warlord steals their family’s
              smartphone, you will have provided a “token” of non-fungible
              support.
            </p>
          </div>
          <div class="flex w-72 flex-col items-center">
            <img src="/home3.png" width={'200'} alt="" />
            <h3 class="pt3 mb-3 font-extrabold">A bottle of hope</h3>
            <p>
              Every dehydrated child can receive an NFT of a water bottle today,
              if only you can find it in your heart and crypto-wallet to give.
            </p>
          </div>
        </div>
      </section>
    )
  }

  render() {
    return (
      <LandingPageLayout preFooter={<GreatPowerFooter />}>
        <TopContent />
        <MiddleContent />
      </LandingPageLayout>
    )
  }
}

export default Home