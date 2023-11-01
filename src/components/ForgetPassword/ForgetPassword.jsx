import axios from 'axios';
import React from 'react';
import $ from 'jquery';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
export default function ForgetPassword() {
    const navigate = useNavigate();
    let user = {
        email:'',
    }
    function loadingImog() {
        $('#forBtn').html(`<i class='fa fa-spinner fa-spin text-white'></i>`);
    }
    async function forgetPassword(userData){
        try {
            const {data} = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords` , userData);

            console.log(data);
            $('.sucMsg').fadeIn(500,function(){
                setTimeout(() => {
                    $('.sucMsg').fadeOut(500,function(){
                        $('#forBtn').html('Check Email');
                        navigate('/forgetpassword/verifycode');
                    });
                }, 2000);
            })
        } catch (error) {
            console.log(error);
            $('#forBtn').html('Check Email');
            if(error.response){
                $('.errMsg').html(error.response.data.message).fadeIn(500,function(){
                    setTimeout(() => {
                        $('.errMsg').fadeOut(500);
                    }, 2000);
                })
            }else{
                $('.errMsg').fadeIn(500,function(){
                    setTimeout(() => {
                        $('.errMsg').fadeOut(500);
                    }, 2000);
                })
            }
        }
    }

    let myFormik = useFormik({
        initialValues: user,
        onSubmit: function(values){
          console.log(values);
          forgetPassword(values);
      },
        validate: function (values) {
          let errors = {};
          if (values.email.includes('@') == false || values.email.includes('.com') == false) {
            errors.email = 'email not valid';
          }
          return errors;
        }
      })
  return <>
  <Helmet>
    <title>Forget Password</title>
  </Helmet>
  <div className="container my-5 py-5 d-flex justify-content-center align-items-center">
    <div className='w-75 producInWideScreen p-5 signUpForm bg-light shadow-lg'>
    <div className="w-100 mb-3 text-center">
        <img className='w-50' src={require('../../assets/omx-ecommerce-low-resolution-logo-color-on-transparent-background.png')} alt="Our Logo" />
      </div>
      <form onSubmit={myFormik.handleSubmit} className='col-12' >
        <div style={{ display: 'none' }} className="sucMsg text-center alert alert-success py-1">Code has been sent to you</div>
        <div style={{ display: 'none' }} className="errMsg text-center alert alert-danger py-1">Error Network !</div>
        <label htmlFor="email" className='mb-2'>email</label>
        <input onBlur={myFormik.handleBlur} onChange={myFormik.handleChange} id='email' placeholder='Email' value={myFormik.values.email} className='form-control mb-3' type="email" />
        {myFormik.errors.email && myFormik.touched.email ? <div className="alert py-1 alert-warning">{myFormik.errors.email}</div> : ''}
        <button id='forBtn' onClick={loadingImog} type='submit' className='btn w-100'>Check Email</button>
        <hr/>
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
