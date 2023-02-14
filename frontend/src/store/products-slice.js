import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: '',
    pages: 1,
    page: 1,
    productsTopLoading: false,
    productsTop: [],
    productsTopError: '',
  },
  reducers: {
    getProductListRequest(state) {
      state.loading = true
      state.error = ''
      state.products = []
    },
    getProductListError(state, action) {
      state.loading = false
      state.error = action.payload
    },
    getProductList(state, action) {
      state.products = action.payload.products
      state.pages = action.payload.pages
      state.page = action.payload.page
      state.loading = false
    },
    getProductsTopRequest(state) {
      state.productsTopLoading = true
      state.productsTopError = ''
      state.productsTop = []
    },
    getProductsTopError(state, action) {
      state.productsTopLoading = false
      state.productsTopError = action.payload
    },
    getProductsTopList(state, action) {
      state.productsTop = action.payload
      state.productsTopLoading = false
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
