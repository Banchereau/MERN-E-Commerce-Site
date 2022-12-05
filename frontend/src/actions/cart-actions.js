import axios from 'axios'
import { cartActions } from '../store/cart-slice'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    dispatch(cartActions.cartAddItemRequest())

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(
      cartActions.cartAddItem({
        _id: data._id,
        name: data.name,
        image: data.image,
        price: data.price,
        countInStock: data.countInStock,
        quantity,
      })
    )
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
  } catch (error) {
    dispatch(
      cartActions.cartAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartActions.cartRemoveItem(id))
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch(cartActions.cartSaveAddress(data))
  localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch(cartActions.cartSavePaymentMethod(data))
  localStorage.setItem('paymentMethod', JSON.stringify(data))
}
