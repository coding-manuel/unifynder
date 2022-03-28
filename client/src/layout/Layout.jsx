import React from 'react';

import Navbar from '../components/Navbar/Navbar';
import Footer from '../components/Footer/Footer'
const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <main style={{minHeight: '100vh'}}>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
