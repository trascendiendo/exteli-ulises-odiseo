'use client'

import { Footer, Header, Nav } from '@/app/ui/components/wrappers';

const PagesLayout = ({ children }) => {
  return (
    <>
      <Nav />
      <div 
        className="relative pc-container"
        style={{
          marginLeft: '280px',
          minHeight: 'calc(100vh - 95px - 74px)',
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