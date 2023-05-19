import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import $ from 'jquery';
import emptycart from '../assets/your-cart-is-empty.png';
import { useDispatch } from 'react-redux';
import { getCartItemsData } from './getLoggedCartItemsSlice';


export const removeCartItems=createAsyncThunk('removecartitem/removeCartItems' , async function(id){
    try {
        $(`#removeBtn${id}`).html(`<i  class='fa fa-spinner fa-spin'></i>`);
        const {data} = await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{
          headers: {
            token: localStorage.getItem('tkn1'),
          }
        });
        if (data.status === "success") {
          $(`#removeBtn${id}`).html(`Remove Product <i class="bi bi-cart-dash-fill"></i>`);

          $('.RemoveMsg').slideDown(500,function(){
            setTimeout(() => {
              $('.RemoveMsg').slideUp(500);
            }, 1500);
          })
          return true , data;
        }else{
          return false;
        }
      } catch (error) {
        console.log(error);
      }
        
})

const removeCartItemsSlice = createSlice({
    name:'removecartitem',
    initialState:{
        CartProducts:null,
        cartItems:0,
        TotalCartPrice:0,
    },
    extraReducers:function(builder){
        builder.addCase(removeCartItems.fulfilled ,function(state , action){
            state.CartProducts = action.payload.data.products;
            state.cartItems = action.payload.numOfCartItems;
            state.TotalCartPrice = action.payload.data.totalCartPrice;
            console.log(action.payload.data.products);
            
            if(state.CartProducts.length == 0){
              $('#emptyCart').html(`<div style="display:'none';z-index:'9999';color:'#398378'" class="emptyCartMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptycart}' alt="Empty Cart" /></div>`).addClass('vh-100');
            }
        })
    }


    
})

export default removeCartItemsSlice.reducer;