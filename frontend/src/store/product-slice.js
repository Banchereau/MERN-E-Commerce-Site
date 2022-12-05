import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
    status: '',
    message: '',
  },
  reducers: {
    getProductRequest(state, action) {
      state.status = 'pending'
    },
    getProductError(state, action) {
      state.status = 'error'
      state.message = action.payload
    },
    getProduct(state, action) {
      state.product = action.payload.product
      state.status = 'success'
    },
  },
})

export const productActions = productSlice.actions
export default productSlice
