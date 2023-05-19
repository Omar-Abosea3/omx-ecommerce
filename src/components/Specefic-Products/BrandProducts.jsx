import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import LodingScrean from '../loadingScreen/LodingScrean';
import $ from 'jquery';
import { useDispatch, useSelector } from 'react-redux';
import { getCartItems } from '../../Store/getCartItemsSlice';
import { getCartItemsData } from '../../Store/getLoggedCartItemsSlice';
import emptyOrder from '../../assets/EmptyPtoducts.png';
import { Helmet } from 'react-helmet';

export default function BrandProducts() {

    const {id} = useParams();
    const [SpecBrand, setSpecBrand] = useState(null);
    

    const getCartSlice = useSelector(function(store){
        return store.getCartSlice;
    });
    
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    async function addToCartCheck(id) {
        if (dispatch(getCartItems(id)) === true) {
            dispatch(getCartSlice(id));
        } else if(!localStorage.getItem('tkn1')){
            navigate('/login');
        }
    }
    
    async function getSpecBrand(){
        try {
            let {data} = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`,{
                params:{
                    brand:id,
                }
            });
            setSpecBrand(data.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(function(){
        getSpecBrand();
        if(dispatch(getCartItemsData()) != false){
            console.log(getCartSlice.cartItems);
        }
    },[getCartSlice.cartItems])
    return <>
        <Helmet>
            <title>BrandProducts</title>
        </Helmet>
        {SpecBrand == null ? <LodingScrean /> : SpecBrand.length != 0 ? <div className="container-fluid d-flex justify-content-center py-5">
        <div style={{ display: 'none', zIndex: '9999' }} className="sucMsg p-3 mt-0 alert alert-light position-fixed px-5 top-0"><i className="fa-solid fa-circle-check"></i> Product Added Successfully .</div>
            <div className="row py-5 gy-4">
                {console.log(SpecBrand)}
                {SpecBrand.map((pro, index) => <div key={index} className="col-6 position-relative producInWideScreen text-white col-sm-4 col-md-3">
                <Helmet>
            <title>{pro.brand.name}</title>
            </Helmet>
                    <div className="product position-relative overflow-hidden">
                        <Link to={`/product-detailes/${pro.id}`} className='text-decoration-none text-white'>
                            <figure className='overflow-hidden'><img className='w-100 proImg' src={pro.imageCover} alt={pro.title} /></figure>
                            <figcaption className='ps-2 py-2'>
                                <img width={'80px'} className='mb-2' src={pro.brand.image} alt={pro.brand.image} />
                                <h2 className='ProTitle'>{pro.title.slice(0, pro.title.indexOf(' ', 10))}</h2>
                                <h4>{pro.subcategory[0].name}</h4>
                                <h4><i className="bi bi-star-fill text-warning"></i> {pro.ratingsAverage}</h4>
                                {pro.priceAfterDiscount ? <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price: <span className='text-decoration-line-through text-danger'>{pro.price}</span> {pro.priceAfterDiscount} </h6> : <h6 style={{ fontSize: '1rem', marginBottom: '10px' }}>price:{pro.price}</h6>}
                                <button className='detBtn btn'> View Detailes <i className='fa fa-arrow-right'></i></button>
                            </figcaption>
                        </Link>
                        <button onClick={function(){addToCartCheck(pro.id)}} id={`addBtn${pro.id}`} title='Add To Cart' className='proBtn w-100 rounded-bottom-2'><i className='fa fa-cart-plus'></i></button>
                        {pro.priceAfterDiscount ? <div className='position-absolute sale me-3 text-center' >Sale</div>:''}
                    </div>


                </div>)}
            </div>
        </div> : <div className="vh-100 d-flex flex-wrap pt-5 text-center justify-content-center align-content-center"><img className='w-25' src={emptyOrder} alt="Empty Order" /> <h2 className='w-100'>This Brand Is Empty !</h2></div>}

    </>
}
