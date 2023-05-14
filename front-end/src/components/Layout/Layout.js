import React from 'react';
import Header from '../Header/Header';
// import Footer from '../Footer/Footer';
const Layout = ({children}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header/>
        <div style={{ flex: 1 }} >{children}</div> 
        {/* <Footer/> */}
    </div>

  )
}

export default Layout