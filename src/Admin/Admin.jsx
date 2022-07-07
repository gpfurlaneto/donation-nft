import Nullstack from 'nullstack'
import ButtonLink from '../layout/buttonLink'
import NftSlogan from '../layout/nftSlogan'
import CreateNFT from './CreateNFT'
import Dashboard from './Dashboard'
import MyNFTs from './MyNFTs'
import ResellNFT from './ResellNFT'

class Admin extends Nullstack {
  render() {
    return (
      <main class="min-h-screen w-full max-w-7xl 2xl:mx-auto flex">
        <nav class="h-full min-h-screen w-1/5 bg-black">
          <header class="flex flex-col items-center gap-5">
            <NftSlogan />
            <ButtonLink clazz="w-32" href="/admin/create-nft">
              Create NFT
            </ButtonLink>
          </header>
        </nav>
        <section class="w-4/5">
          <CreateNFT route="/admin/create-nft" />
          <MyNFTs route="/admin/my-nfts" />
          <Dashboard route="/admin/dashboard" />
          <ResellNFT route="/admin/resell-nft" />
        </section>
      </main>
    )
  }
}

export default Admin