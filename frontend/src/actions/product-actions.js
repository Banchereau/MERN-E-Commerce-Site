import axios from 'axios'
import { uiActions } from '../store/ui-slice'
import { productsActions } from '../store/products-slice'
import { productActions } from '../store/product-slice'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending products list',
      })
    )

    const { data } = await axios.get('/api/products')

    dispatch(
      productsActions.getProductList({
        products: data || [],
      })
    )

    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Sucess',
        message: 'Sending products list succesfully',
      })
    )
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending product',
      })
    )

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(
      productActions.getProduct({
        product: data || { reviews: [] },
      })
    )

    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Sucess',
        message: 'Sending product succesfully',
      })
    )
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}
