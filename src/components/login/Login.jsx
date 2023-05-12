import { useFormik } from 'formik';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import axios from 'axios';
import { Helmet } from 'react-helmet';
export default function Login({ getUserData }) {
  const navigate = useNavigate();

  function afterLogin() {
    getUserData();
    navigate('/home');
  }
  const loginUser = {
    "email": "",
    "password": "",
  }

  function loadingImog() {
    $('.loginBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
  }

  async function sendNewUser(nUser) {
    try {
      const { data } = await axios.post(`https://route-ecommerce-app.vercel.app/api/v1/auth/signin`, nUser);
      if (data.message == 'success') {
        localStorage.setItem('tkn1', data.token);
        setTimeout(() => {
          $('.loginBtn').html('Login');
          afterLogin();
        }, 2000);
      }

    } catch (error) {
      console.log(error);
      $('.loginBtn').html('Login');
      $('.errMsg').fadeIn(500, function () {
        setTimeout(() => {
          $('.errMsg').fadeOut(500);
        }, 2000);
      })
    }
  }
  const formik = useFormik({
    initialValues: loginUser,

    onSubmit: function (values) {
      console.log(values);
      sendNewUser(values);
    },

  })

  return <>
    <Helmet>
      <title>Login</title>
    </Helmet>
    <div className="container py-5 my-5 d-flex justify-content-center align-items-center">
    <div style={{display:'none',zIndex:'999999'}} className="notLogin mt-0 p-3 alert bg-dark text-white px-5 position-fixed top-0"><i className="fa-solid fa-close"></i> you Must Logged in first !!</div>
      <div className="signUpForm bg-light w-75 mt-5 p-5 shadow-lg">
        <div className="w-100 mb-3 text-center">
          <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
        </div>
        <form className='px-1 col-12 producInWideScreen' onSubmit={formik.handleSubmit}>
          <div style={{ display: 'none' }} className="errMsg mb-3 text-center alert alert-danger py-1">Email or Password is not correct.</div>
          <div className="w-100">
            <label className='mb-2' htmlFor="email">email</label>
            <input id='email' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.email} className='form-control' placeholder='email' type="email" />
            <label className='mt-4 mb-2' htmlFor="password">password</label>
            <input id='password' onBlur={formik.handleBlur} onChange={formik.handleChange} value={formik.values.password} className='form-control' placeholder='password' type="password" />
          </div>

          <button onClick={loadingImog} type='submit' className='btn loginBtn w-100 mt-4'>Login</button>
          <hr/>
          <h6 className='text-center'>Not a member yet? <Link className="text-decoration-none" to={"/signup"}>Create Account</Link></h6>

        </form>

        <div className="col-12 d-flex justify-content-center align-items-center">
          <div className="MyIcons">
            <i className='fa-brands fa-facebook-f'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-instagram'></i>
          </div>
          <div className="MyIcons">
            <i className='fa-brands fa-paypal'></i>
          </div>
          <div className="MyIcons">
            <i className='fa fa-vcard'></i>
          </div>
        </div>
      </div>
    </div>

  </>
}

