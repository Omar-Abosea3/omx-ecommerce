import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom';
import './App.css';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Brands from './components/Brands/Brands';
import Cart from './components/Cart/Cart';
import Login from './components/login/Login';
import SignUp from './components/SignUp/SignUp';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import BrandProducts from './components/Specefic-Products/BrandProducts';
import ProductDetailes from './components/ProductDetailes/ProductDetailes';
import Payment from './components/Payment/Payment';
import MyOrders from './components/getOrders/MyOrders';
import $ from 'jquery';






export default function App() {

  const [curUser, setcurUser] = useState(null);
  function getUserData(){
    const userData = jwtDecode(localStorage.getItem('tkn1'));
    setcurUser(userData);
  }
  
  function clearUserData(){
    localStorage.removeItem('tkn1');
    setcurUser(null);
  }

  useEffect(function () {
    if (localStorage.getItem("tkn1") != null && curUser == null) {
      getUserData();
    }
  }, []);

  function ProtectedRoutes({children}){

    if(localStorage.getItem('tkn1') == null){
      {setTimeout(() => {
        $(".notLogin").fadeIn(500, function () {
          setTimeout(() => {
            $(".notLogin").fadeOut(500);
          }, 2000);
        });
      }, 500)}
      return (
        <>
          <Navigate to="/login" />
        </>
      ); 
    }else{
      return <>
        {children}
      </>;
    }
  }

  function ProtectedRoutes2({children}){


    if(localStorage.getItem('tkn1') != null){
      return <>
      <Navigate to='/home'/>
      
      </> 
    }else{
      return <>
        {children}
      </>;
    }

  }


  const router = createHashRouter([
    {path:'',element:<Layout curUser={curUser} clearUserData={clearUserData} />,children:[
      {path:'',element:<Home/>},
      {path:'home',element:<Home/>},
      {path:'brands',element:<Brands/>},
      {path:'brands/:id',element:<BrandProducts/>},
      {path:'product-detailes/:id',element:<ProtectedRoutes><ProductDetailes/></ProtectedRoutes>},
      {path:'cart',element:<ProtectedRoutes><Cart/></ProtectedRoutes>},
      {path:'payment',element:<ProtectedRoutes><Payment/></ProtectedRoutes>},
      {path:'allorders',element:<ProtectedRoutes><MyOrders curUser={curUser} /></ProtectedRoutes>},
      {path:'login',element:<ProtectedRoutes2><Login getUserData={getUserData}/></ProtectedRoutes2>},
      {path:'signup',element:<ProtectedRoutes2><SignUp/></ProtectedRoutes2>},
      
      {path:'*',element:<div className='vh-100 d-flex py-5 my-5 justify-content-center align-items-center text-black'><img className='w-75' src={require('./assets/error 404.jpg')} alt='error'/>  </div>},
    ]}
  ])

  return <>
      <RouterProvider router={router}/>
  </>
}


