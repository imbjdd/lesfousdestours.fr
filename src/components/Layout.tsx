import Footer from './Footer'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div className="">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}

export default Layout
