import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import emptyWishlist from '../assets/emptyWishlist.png';
import $ from 'jquery';





export const getFavProductsData=createAsyncThunk('getwishitem/getWishItemsData' , async function(id = 0){
    try {
        const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/wishlist",
          {
            headers: { token: localStorage.getItem("tkn1") },
          }
        );
       if (data.status === "success") {
        console.log(data);
        if(!data.data.length){
            $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100'); 
        }
        return true , data ;
       }
      } catch (error) {
        console.log(error);
        return false ;
    }
})

const getFavProductsSlice = createSlice({
    name:'getwishitem',
    initialState:{
        wishlistProducts:null,
        wishlistItems:0
    },
    extraReducers:function(builder){
        builder.addCase(getFavProductsData.fulfilled ,function(state , action){
            if(action.payload == false){
                state.wishlistProducts = null;
                state.wishlistItems = 0;
                $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100');
            }else if( action.payload.data.length==0){
                console.log('iam here wishlist');
                state.wishlistProducts = null;
                state.wishlistItems = 0;
            }else{
                state.wishlistProducts = action.payload.data;
                state.wishlistItems = action.payload.count;
            }   
        })
        builder.addCase(getFavProductsData.rejected ,function(state){
            $('#emptyWishlist').html(`<div class="emptyWishlistMsg pt-5 justify-content-center align-items-center"><img class='w-100' src='${emptyWishlist}' alt="Empty Wishlist" /></div>`).addClass('vh-100');
        })
    }


    
})

export default getFavProductsSlice.reducer;