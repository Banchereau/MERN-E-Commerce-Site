import axios from 'axios'
import { productsActions } from '../store/products-slice'
import { productActions } from '../store/product-slice'

export const listProducts = () => async (dispatch) => {
  try {
    dispatch(productsActions.getProductListRequest())

    const { data } = await axios.get('/api/products')

    dispatch(
      productsActions.getProductList({
        products: data || [],
      })
    )
  } catch (error) {
    dispatch(
      productsActions.getProductListError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productActions.getProductRequest())

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch(
      productActions.getProduct({
        product: data || { reviews: [] },
      })
    )
  } catch (error) {
    dispatch(
      productActions.getProductError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
