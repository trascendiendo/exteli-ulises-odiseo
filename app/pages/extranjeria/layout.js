import { Footer, Header, Nav } from "../../ui/components/wrappers";

export default function PagesLayout({ children }) {
  return (
    <>
      <Nav />
      <Header />
      <div 
        className="relative pc-container"
        style={{
          marginLeft: '280px',
          minHeight: 'calc(100vh - 135px)',
          top: '74px'
        }}
      >
        {children}
      </div>
      <Footer />
    </>
  )
}