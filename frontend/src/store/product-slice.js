import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
    status: '',
    message: '',
    deleteStatus: '',
    deleteMessage: '',
    createProductStatus: '',
    createProductMessage: '',
    createdProduct: { reviews: [] },
    updateProductStatus: '',
    updateProductMessage: '',
    updatedProduct: { reviews: [] },
  },
  reducers: {
    getProductRequest(state) {
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
    deleteProductRequest(state) {
      state.deleteStatus = 'pending'
    },
    deleteProductError(state, action) {
      state.deleteStatus = 'error'
      state.deleteMessage = action.payload
    },
    deleteProduct(state) {
      state.deleteStatus = 'success'
      state.deleteMessage = ''
    },
    createProductRequest(state) {
      state.createProductStatus = 'pending'
    },
    createProductError(state, action) {
      state.createProductStatus = 'error'
      state.createProductMessage = action.payload
    },
    createProductSuccess(state, action) {
      state.createProductStatus = 'success'
      state.createProductMessage = ''
      state.createdProduct = action.payload
    },
    createProductReset(state) {
      state.createProductStatus = ''
      state.createProductMessage = ''
      state.createdProduct = { reviews: [] }
    },
    updateProductRequest(state) {
      state.updateProductStatus = 'pending'
    },
    updateProductError(state, action) {
      state.updateProductStatus = 'error'
      state.updateProductMessage = action.payload
    },
    updateProductSuccess(state, action) {
      state.updateProductStatus = 'success'
      state.updateProductMessage = ''
      state.updatedProduct = action.payload
    },
    updateProductReset(state) {
      state.updateProductStatus = ''
      state.updateProductMessage = ''
      state.updatedProduct = { reviews: [] }
    },
    resetProductStatus(state) {
      state.product = { reviews: [] }
      state.status = ''
      state.message = ''
      state.deleteStatus = ''
      state.deleteMessage = ''
    },
  },
})

export const productActions = productSlice.actions
export default productSlice
