import axios from 'axios'
import { productsActions } from '../store/products-slice'
import { productActions } from '../store/product-slice'

export const listProducts =
  (keyword = '', pageNumber = '') =>
  async (dispatch) => {
    try {
      dispatch(productsActions.getProductListRequest())

      const { data } = await axios.get(
        `/api/products?keyword=${keyword}&pageNumber=${pageNumber}`
      )
      dispatch(productsActions.getProductList(data))
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

export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    dispatch(productActions.deleteProductRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }

    await axios.delete(`/api/products/${id}`, config)

    dispatch(productActions.deleteProduct())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(productActions.deleteProductError(message))
  }
}

export const createProduct = () => async (dispatch, getState) => {
  try {
    dispatch(productActions.createProductRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch(productActions.createProductSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(productActions.createProductError(message))
  }
}

export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    dispatch(productActions.updateProductRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/products/${product._id}`,
      product,
      config
    )
    dispatch(productActions.updateProductSuccess(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(productActions.updateProductError(message))
  }
}

export const createProductReview =
  (productId, review) => async (dispatch, getState) => {
    try {
      dispatch(productActions.createReviewRequest())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        },
      }

      await axios.post(`/api/products/${productId}/reviews`, review, config)

      dispatch(productActions.createReviewDone())
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message

      dispatch(productActions.createReviewFailed(message))
    }
  }

export const listTopProducts = () => async (dispatch) => {
  try {
    dispatch(productsActions.getProductsTopRequest())

    const { data } = await axios.get(`/api/products/top`)

    dispatch(productsActions.getProductsTopList(data))
  } catch (error) {
    dispatch(
      dispatch(
        productsActions.getProductsTopError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    )
  }
}
