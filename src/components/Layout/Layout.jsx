import React from 'react';
import Navbar from '../Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';



export default function Layout({clearUserData,curUser}) {


  return <>
        <Navbar curUser={curUser} clearUserData={clearUserData} />
        <div style={{display:'none',zIndex:'9999',bottom:'2%'}} className="emptyCart text-center alert bg-dark start-0 end-0 mx-5 text-white position-fixed"><i className="bi bi-cart-x-fill"></i> Your Cart Is Empty.</div>
        <div style={{display:'none',zIndex:'9999',bottom:'2%'}} className="RemoveMsg mt-0 text-center alert bg-dark text-white position-fixed start-0 end-0 mx-5"><i className="bi bi-cart-dash-fill"></i> Product Removed From Cart Successfully .</div>
        <Outlet/>
        <Footer/>
  </>
}
