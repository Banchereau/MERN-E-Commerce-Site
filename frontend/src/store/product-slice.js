import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
  },
  reducers: {
    getProduct(state, action) {
      state.product = action.payload.product
    },
  },
})

export const productActions = productSlice.actions
export default productSlice
