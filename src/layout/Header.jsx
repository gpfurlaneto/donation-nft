// import Nullstack from 'nullstack'
// import AccountIcon from '../icons/account'
// import NftSlogan from './nftSlogan'

// class Header extends Nullstack {
//   currentRouterStyle({ router, linkHref }) {
//     if (router.url === linkHref) {
//       return 'border-b-2 border-mustard'
//     }
//   }

//   renderMyAccount() {
//     return (
//       <a href="#" class="flex items-center justify-end pt-3">
//         <AccountIcon /> <span class="ml-2"><a href="/admin">My Account</a></span>
//       </a>
//     )
//   }

//   render() {
//     return (
//       <div>
//         <MyAccount />
//         <div class="flex items-center justify-between p-6">
//           <NftSlogan />
//           <nav>
//             <div class="mt-4 flex justify-end text-white">
//               <a
//                 class={`mr-6 ${this.currentRouterStyle({ linkHref: '/' })}`}
//                 href="/"
//               >
//                 Home
//               </a>
//               <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/wtf' })}`} href="/wtf">
//                 WTF?
//               </a>
//               <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/explore' })}`} href="/explore">
//                 Explore
//               </a>
//               <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/taps' })}`} href="/taps">
//                 TAPs
//               </a>
//             </div>
//           </nav>
//         </div>
//       </div>
//     )
//   }
// }

// export default Header
import Nullstack from 'nullstack';
import AccountIcon from '../icons/account';
import TapIcon from '../icons/tap';

class Header extends Nullstack {

  currentRouterStyle({ router, linkHref }) {
    if (router.url === linkHref) {
      return 'border-b-2 border-mustard'
    }
  }

  renderMyAccount() {
    return (
      <a href="#" class="flex items-center justify-end pt-3">
        <AccountIcon /> <span class="ml-2">My Account</span>
      </a>
    )
  }

  renderWallet({ _wallet }) {
    return (
      <div class="flex flex-row items-center pt-3 ">
        <TapIcon/>
        <div class="text-center ml-5 mr-10">
          <div class="text-sm text-left font-medium">{_wallet?.balance} TAP</div>
          <div class="text-wallet-tap">{_wallet.label}</div>
        </div>
      </div>
    )
  }

  render({ _wallet }) {
    return (
      <div class="flex flex-col items-center">
        <div class="ml-auto flex flex-row justify-end align px-8">
          {_wallet?.isConnected && <Wallet />}
          <MyAccount />
        </div>
        <div class="flex items-center justify-between p-6 w-11/12 max-w-[1200px]">
          <h1 class="w-[175px] pt-5 pl-5 text-center text-sm uppercase text-white">
            <div class="font-bold text-xs">NFTS For</div>
            <div class="text-sm font-extralight">
              Starving
              <br />
              Children
            </div>
          </h1>
          <nav>
            <div class="mt-4 flex justify-end text-white">
              <a
                class={`mr-6 ${this.currentRouterStyle({ linkHref: '/' })}`}
                href="/"
              >
                Home
              </a>
              <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/wtf' })}`} href="/wtf">
                WTF?
              </a>
              <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/explore' })}`} href="/explore">
                Explore
              </a>
              <a class={`mr-6 ${this.currentRouterStyle({ linkHref: '/taps' })}`} href="/taps">
                TAPs
              </a>
              <a
                class={`mr-6 ${this.currentRouterStyle({ linkHref: '/home1' })}`}
                href="/"
              >
                Home1
              </a>
            </div>
          </nav>
        </div>
      </div>
    )
  }
}

export default Header