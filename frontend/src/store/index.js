import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui-slice'
import productsSlice from './products-slice'
import productSlice from './product-slice'
import cartSlice from './cart-slice'
import userSlice from './user-slice'
import orderSlice from './order-slice'

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    products: productsSlice.reducer,
    product: productSlice.reducer,
    cart: cartSlice.reducer,
    user: userSlice.reducer,
    order: orderSlice.reducer,
  },
})

export default store
