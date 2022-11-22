import { createSlice } from '@reduxjs/toolkit'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
  },
  reducers: {
    cartAddItem(state, action) {
      const item = action.payload
      const existItemIndex = state.cartItems.findIndex((x) => x.id === item.id)

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex] = item
        //console.log('cart-slice update item state')
      } else {
        state.cartItems.push(item)
        //console.log('cart-slice add new item state')
      }
    },
    cartRemoveItem(state, action) {
      const id = action.payload
      const itemIndex = state.cartItems.findIndex((x) => x.id === id)
      state.cartItems.splice(itemIndex, 1)
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
