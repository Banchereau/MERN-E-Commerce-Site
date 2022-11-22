import { createSlice } from '@reduxjs/toolkit'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
  },
  reducers: {
    getProductList(state, action) {
      state.products = action.payload.products
    },
  },
})

export const productsActions = productsSlice.actions
export default productsSlice
