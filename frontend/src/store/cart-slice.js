import { createSlice } from '@reduxjs/toolkit'

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : []

const cartAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}

const cartPaymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : {}

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: cartItemsFromStorage,
    shippingAddress: cartAddressFromStorage,
    paymentMethod: cartPaymentMethodFromStorage,
    status: '',
    message: '',
  },
  reducers: {
    cartAddItemRequest(state) {
      state.status = 'pending'
    },
    cartAddItemError(state, action) {
      state.status = 'error'
      state.message = action.payload
    },
    cartAddItem(state, action) {
      const item = action.payload
      const existItemIndex = state.cartItems.findIndex(
        (x) => x._id === item._id
      )

      if (existItemIndex !== -1) {
        state.cartItems[existItemIndex] = item
        //console.log('cart-slice update item state')
      } else {
        state.cartItems.push(item)
        //console.log('cart-slice add new item state')
      }
      state.status = 'success'
    },
    cartRemoveItem(state, action) {
      const id = action.payload
      const itemIndex = state.cartItems.findIndex((x) => x._id === id)
      state.cartItems.splice(itemIndex, 1)
    },
    cartSaveAddress(state, action) {
      state.shippingAddress = action.payload
    },
    cartSavePaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
  },
})

export const cartActions = cartSlice.actions
export default cartSlice
