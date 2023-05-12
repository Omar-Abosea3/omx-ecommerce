import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import LodingScrean from '../loadingScreen/LodingScrean';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery'
import Slider from 'react-slick';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../Store/getCartItemsSlice';
import {getCartItemsData} from '../../Store/getLoggedCartItemsSlice';
import { Helmet } from 'react-helmet';
export default function Home() {

    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        arrows : false,
        pauseOnHover: true,
      };

      const settings2 = {
        dots: false,
        infinite: true,
        speed: 2500,
        slidesToShow: 6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        arrows : false,
        cssEase: 'linear',
        rtl: true,
        pauseOnHover: false,
      };

      const settings3 = {
        dots: false,
        infinite: true,
        speed: 2000,
        slidesToShow:6,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 0,
        arrows : false,
        cssEase: 'linear',
        rtl: false,
        pauseOnHover: false,
      };

    const [product, setProduct] = useState(null);
    const [homeTop, sethomeTop] = useState(0);

    const getCartSlice = useSelector(function(store){
        return store.getCartSlice;
    });
    
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function addToCartCheck(id) {
        if (dispatch(getCartItems(id)) === true) {
            dispatch(getCartItemsData());
        } else if(!localStorage.getItem('tkn1')){
            navigate('/login');
        }
    }
      
            

    async function getProduct(){
        try {
            let {data} = await axios.get('https://route-ecommerce-app.vercel.app/api/v1/products');
            setProduct(data.data);
            sethomeTop($('#homeTop').offset().top);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function(){
        getProduct();
        if(dispatch(getCartItemsData()) != false){
            console.log(getCartSlice.cartItems);
        }
        
    },[getCartSlice.cartItems])

        
    return <>
    <Helmet>
        <title>Home</title>
    </Helmet>
        {product == null ? <LodingScrean /> : <div className="container-fluid py-5">
            <div className="row justify-content-center gy-4">
                <Slider className='w-100 mb-3 overflow-hidden' {...settings}>
                    <div className='slider-photo slider1'>
                        <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>

                    <div className='slider-photo slider2' >
                    <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>

                    <div className='slider-photo slider3' >
                    <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>

                    <div className='slider-photo slider4' >
                    <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>

                    <div className='slider-photo slider5' >
                    <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>

                    <div className='slider-photo slider6' >
                    <div className="SliderLayer d-flex flex-wrap align-content-center text-light bg-dark bg-opacity-75 p-5 position-absolute top-0 end-0 bottom-0 start-0">
                            <h2>Hello In OMX website for e-commerce.</h2>
                            <p>In our website you can find any product you need and all brands you love an we will keep your happiness always.</p>
                            <button onClick={function(){$('html,body').animate({scrollTop:homeTop},2000)}} className='btn align-self-end btn-dark rounded-0 py-4 fs-3 px-5'>Shop Now </button>
                        </div>
                    </div>
                </Slider>
                <h2><i className="fa-solid fa-layer-group"></i> Brands.</h2>
                <Slider className='w-100 Sliders mb-3 overflow-hidden' {...settings2}>
                    <div>
                        <img className='w-100'src={require('../../assets/Addidas.png')} alt="Addidas" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Beko.png')} alt="Beko" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Fresh.png')} alt="Fresh" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Defacto.png')} alt="Defacto" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Nike.png')} alt="Nike" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/apple.png')} alt="apple" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Jack&Jonse.png')} alt="Jack&Jonse" />
                    </div>
                    <div>
                        <img className='w-100' src={require('../../assets/samsung.png')} alt="samsung" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Tornado.png')} alt="Tornado" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/LC.png')} alt="LC" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Puma.png')} alt="Puma" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Rebook.png')} alt="Rebook" />
                    </div>

                </Slider>
                <h2><i className="bi bi-kanban-fill"></i> Categories.</h2>
                <Slider className='w-100 Sliders mb-3 overflow-hidden' {...settings3}>
                <div>
                        <img className='w-100'src={require('../../assets/women.jpeg')} alt="women" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/men.jpeg')} alt="men" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/electoronix2.jpeg')} alt="electoronix2" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/Electoronics.png')} alt="Electoronics" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/electoronix3.jpeg')} alt="electoronix3" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/choose.jpeg')} alt="choose" />
                    </div>

                    <div >
                    <img className='w-100' src={require('../../assets/electoronix4.jpeg')} alt="electoronix4.jpeg" />
                    </div>

                </Slider>
                <h2><i className="bi bi-border-all"></i> All Products.</h2>
                <div style={{ display: 'none', zIndex: '9999' }} className="sucMsg p-3 mt-0 alert alert-light position-fixed px-5 top-0"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
                {product.map((pro, index) => <div id='homeTop' key={index} className="col-6  position-relative producInWideScreen text-white col-sm-4 col-md-3 col-lg-2 ">
    
                    <div className="product position-relative overflow-hidden">
                        <Link to={`/product-detailes/${pro.id}`} className='text-decoration-none shadow-lg text-white'>
                            <figure className='overflow-hidden'><img className='w-100 proImg' src={pro.imageCover} alt={pro.title} /></figure>
                            <figcaption className='ps-2 py-2'>
                                <img width={'80px'} className='mb-2' src={pro.brand.image} alt={pro.brand.image} />
                                <h2 className='ProTitle'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h2>
                                <h4>{pro.subcategory[0].name}</h4>
                                <h4><i className="bi bi-star-fill text-warning"></i> {pro.ratingsAverage}</h4>
                                {pro.priceAfterDiscount ? <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price: <span className='text-decoration-line-through text-danger'>{pro.price}</span> {pro.priceAfterDiscount} </h6> : <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price:{pro.price}</h6>}
                                <button className='detBtn btn' title='detailes'> View Detailes <i className='fa fa-arrow-right'></i></button>
                            </figcaption>
                        </Link>
                        <button onClick={function(){addToCartCheck(pro.id)}} id={`addBtn${pro.id}`} title='Add To Cart'  className='proBtn w-100 rounded-bottom-2'><i className='fa fa-cart-plus'></i></button>
                        {pro.priceAfterDiscount ? <div className='position-absolute sale me-3 text-center' >Sale</div>:''}
                    </div>


                </div>)}
            </div>
        </div>}
    </>
}
