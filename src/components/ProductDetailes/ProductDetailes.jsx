import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LodingScrean from '../loadingScreen/LodingScrean';
import Slider from "react-slick";

import $ from 'jquery';
import { getCartItems } from '../../Store/getCartItemsSlice';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

export default function ProductDetailes() {

    const {id} = useParams();

    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 1500,
        arrows : false,
      };

      const getCartSlice = useSelector(function(store){
        return store.getCartSlice;
    });

      async function addToCartCheck(id) {
        if (dispatch(getCartItems(id)) === true) {
            dispatch(getCartItemsData());
        } else {
            console.log('sorry');
        }
    }
   


    const [Specproduct, setSpecProduct] = useState(null);
    async function getSpecProduct(){
        try {
            let {data} = await axios.get(`https://route-ecommerce-app.vercel.app/api/v1/products/${id}`);
            setSpecProduct(data.data);
            console.log(Specproduct);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(function () {
        getSpecProduct();
        if (dispatch(getCartItemsData()) != false) {
            console.log(getCartSlice.cartItems);
        }
    }, [getCartSlice.cartItems])

    return <>
        {Specproduct == null ? <LodingScrean /> : <>
            <Helmet>
                <title>{Specproduct.title}</title>
            </Helmet>
            {console.log(Specproduct)}
            <div className="container productFontSize2 py-5">
                <div className="row justify-content-center align-items-start py-5 gy-5">
                    <div style={{ display: 'none', zIndex: '9999' }} className="sucMsg p-3 mt-0 alert alert-light position-fixed  top-0"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-4">
                        <Slider className='p-2 '  {...settings}>
                            {Specproduct.images.map((photo, index) => <div key={index} className='rounded-2 overflow-hidden'>
                                <img className='w-100 ' src={photo} alt={Specproduct.title} />
                            </div>)}
                        </Slider>
                    </div>
                    <div className="col-12 col-sm-12 col-md-12 col-lg-8">
                        <h2 className='ProTitle' >{Specproduct.title}</h2>
                        <p className='fs-3 fw-light'>"{Specproduct.description}"</p>

                        <div className='d-flex justify-content-between align-items-start'>
                            <div className='w-75'>
                                <h3 className='mb-4'>Brand: <span className='fw-light'>{Specproduct.brand.name}</span></h3>
                                <h3 className='mb-4'>category: <span className='fw-light'>{Specproduct.subcategory[0].name}</span></h3>
                                <h3 className='mb-4'>Rate: <span className='fw-light'>{Specproduct.ratingsAverage}</span> </h3>
                                <h3 className='mb-4'>Sold: <span className='fw-light'>{Specproduct.sold}</span> </h3>
                                <h3 className='mb-4'>Available-Quantity: <span className='fw-light'>{Specproduct.quantity}</span> </h3>
                                {Specproduct.priceAfterDiscount ? <h3 className='mb-4'>price: <span className='fw-light text-decoration-line-through text-danger'>{Specproduct.price}</span>  <span className='fw-light'>{Specproduct.priceAfterDiscount}</span> </h3> : <h3 className='mb-4'>price: <span className='fw-light'>{Specproduct.price}</span> </h3>}
                            </div>

                        </div>
                    </div>
                    <div className="px-2"><button onClick={function () { addToCartCheck(Specproduct.id) }} id={`addBtn1${Specproduct.id}`} className='btn proBtn2 col-12'>Add To Cart <i className="bi bi-bag-plus-fill"></i></button></div>
                </div>
            </div>
        </>}
    </>
}
