import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getCartItems } from '../../Store/getCartItemsSlice';





export default function Navbar({clearUserData,curUser}) {
    const navigate = useNavigate();
    const getCartItemSlice = useSelector(function(store){
        return store.getCartItemSlice;
    });



    
  return <>
      <nav className="navbar navbar-expand-lg fixed-top ">
          <div className="container-fluid">
              <Link className="navbar-brand" to={'/home'}> <img src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="logo" style={{ width: "150px" }} /> </Link>
              <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
              </button>
              <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  {curUser ? <>
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item d-flex">
                              <Link className="nav-link Home align-self-center active" aria-current="page" to={'/home'}><i className='fa fa-home'></i> Home</Link>
                          </li>
                          <li className="nav-item d-flex">
                              <Link className="nav-link align-self-center" to={'/brands'}> <i className="fa-solid fa-layer-group"></i> Brands</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link d-flex align-items-center " to={'/cart'}>
                                  Cart
                                  <i className="fa  fa-shopping-cart"></i>
                                  <p id='numOfItems' className='text-white text-bg-dark rounded-2 px-1 fs-6'>{getCartItemSlice.cartItems}</p>
                              </Link>
                          </li>
                          <li className="nav-item d-flex">
                              <Link className="nav-link align-self-center" to={'/allorders'}> All Orders <i className="bi bi-bag-fill"></i></Link>
                          </li>
                      </ul>

                      <ul className="navbar-nav mb-2 mb-lg-0 ms-auto ">
                          <li className="nav-item">
                              <button onClick={function () { clearUserData(); navigate('/login') }} className='btn btn-dark'>Log Out <i className="fa-solid fa-arrow-right-from-bracket"></i></button>
                          </li>
                      </ul>
                  </> : <>
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item d-flex">
                              <Link className="nav-link align-self-center" aria-current="page" to={'/home'}><i className='fa fa-home'></i> Home</Link>
                          </li>
                          <li className="nav-item d-flex">
                              <Link className="nav-link align-self-center" to={'/brands'}> <i className="fa-solid fa-layer-group"></i> Brands</Link>
                          </li>
                          <li className="nav-item">
                              <Link className="nav-link d-flex align-items-center " to={'/cart'}>
                                  Cart
                                  <i className="fa fs-4 fa-shopping-cart"></i>
                              </Link>
                          </li>
                      </ul>
                      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                          <li className="nav-item">
                              <Link className="nav-link btn btn-light" to={'/login'}>Login</Link>
                          </li>
                          <li className="nav-item ms-lg-2 mt-2 mt-lg-0">
                              <Link className="nav-link link-light btn btn-dark" to={'/signup'}>SignUp</Link>
                          </li>
                      </ul>
                  </>}
              </div>
          </div>
      </nav>
  </>
}
