import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product: { reviews: [] },
    getProductStatus: '',
    getProductLoading: false,
    getProductErrorMsg: '',
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
      state.getProductLoading = true
      state.getProductStatus = 'pending'
      state.product = { reviews: [] }
      state.getProductErrorMsg = ''
    },
    getProductError(state, action) {
      state.getProductLoading = false
      state.getProductStatus = 'error'
      state.getProductErrorMsg = action.payload
    },
    getProduct(state, action) {
      state.product = action.payload.product
      state.getProductLoading = false
      state.getProductStatus = 'success'
    },
    getProductReset(state) {
      state.product = { reviews: [] }
      state.getProductLoading = false
      state.getProductStatus = ''
      state.getProductErrorMsg = ''
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
