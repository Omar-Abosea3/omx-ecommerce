import { configureStore } from '@reduxjs/toolkit';

import getCartSlice from './getCartItemsSlice';
import getCartItemSlice from './getLoggedCartItemsSlice';
import removeCartItemsSlice from './RemoveCartItemSlice';




export const myStore = configureStore({
    reducer:{
        getCartSlice:getCartSlice,
        getCartItemSlice:getCartItemSlice,
        removeCartItemsSlice:removeCartItemsSlice,
    },
});
