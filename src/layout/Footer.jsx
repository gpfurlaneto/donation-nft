import Title from "./title";

export default function Footer() {
  return (
    <footer class="border-t border-white pt-8 pb-8 bg-black">
      <div class="flex w-11/12 justify-between">
        <div class="flex flex-col">
          <div class="uppercase text-white">
            <div class="text-center">
              <span class="block text-sm font-bold">NFTS For</span>
              <span class="block text-2xl font-extralight">Starving</span>
              <span class="block text-2xl font-extralight">Children</span>
            </div>
          </div>
          <p class="mt-10 ml-10 w-56 text-white">
            They may not have food, but you can help an NFT-less child with this
            buy one, give one opportunity. Every child deserves an NFT.
          </p>
        </div>
        <nav>
          <Title text="Marketplace" />
          <ul>
            <li class="mb-3">
              <a href="/wtf" class="hover:text-mustard">
                WFT?
              </a>
            </li>
            <li class="mb-3">
              <a href="/explore" class="hover:text-mustard">
                Explore
              </a>
            </li>
            <li class="mb-3">
              <a href="/taps" class="hover:text-mustard">
                TAPs
              </a>
            </li>
            <li>
              <a class="text-black hover:text-mustard" href="/create-nft">
                Create NFT
              </a>
            </li>
            <li>
              <a class="text-black hover:text-mustard" href="/my-nfts">
                My NFT
              </a>
            </li>
            <li>
              <a class="text-black hover:text-mustard" href="/dashboard">
                Dashboard
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}