import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    status: '',
    message: '',
  },
  reducers: {
    getProductListRequest(state) {
      state.status = 'pending'
    },
    getProductListError(state, action) {
      state.status = 'error'
      state.message = action.payload
    },
    getProductList(state, action) {
      state.products = action.payload.products
      state.status = 'success'
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
