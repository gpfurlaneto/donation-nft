import Footer from './Footer'
import Header from './Header'

export default function LandingPageLayout({ children, preFooter }) {
  return (
    <>
      <div class="m-auto w-11/12 max-w-[1200px] text-white">
        <Header />
        <main>{children}</main>
      </div>
      {preFooter}
      <Footer />
    </>
  )
}
