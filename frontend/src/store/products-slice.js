import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    loading: false,
    error: '',
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
      state.loading = false
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
