import axios from 'axios'
import { uiActions } from '../store/ui-slice'
import { cartActions } from '../store/cart-slice'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
  try {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(
      cartActions.cartAddItem({
        id: data._id,
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
      uiActions.showNotification({
        status: 'error',
        title: 'Error in cart management!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch(cartActions.cartRemoveItem(id))
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}
