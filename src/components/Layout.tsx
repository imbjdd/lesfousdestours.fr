import Footer from './Footer'
import Banner from './Banner'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Banner />
      <div className="">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
