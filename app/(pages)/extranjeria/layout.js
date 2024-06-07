import withAuth from "@/app/libs/hocs/withAuth";
import { Footer, Header, Nav } from "../../ui/components/wrappers";

const PagesLayout = ({ children }) => {
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
        <div 
          className="pc-content"
          style={{
            paddingLeft: '40px',
            paddingRight: '40px',
            paddingTop: '20px'
          }}
        >
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PagesLayout