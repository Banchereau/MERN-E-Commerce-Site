import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    ordersStatus: '',
    ordersMessage: '',
    orderPay: null,
    ordersPayStatus: '',
    ordersPayMessage: '',
    myorders: null,
    myordersStatus: '',
    myordersMessage: '',
  },
  reducers: {
    orderAddItemRequest(state) {
      state.ordersStatus = 'pending'
    },
    orderAddItemError(state, action) {
      state.ordersStatus = 'error'
      state.ordersMessage = action.payload
    },
    orderAddItem(state, action) {
      state.ordersStatus = 'success'
      state.orders = action.payload
    },
    orderAddItemReset(state) {
      state.ordersStatus = ''
      state.orders = null
    },
    orderPayRequest(state) {
      state.ordersPayStatus = 'pending'
    },
    orderPayError(state, action) {
      state.ordersPayStatus = 'error'
      state.ordersPayMessage = action.payload
    },
    orderPay(state, action) {
      state.orderPay = action.payload
    },
    orderResetPay(state) {
      state.orderPay = null
      state.ordersPayStatus = ''
      state.ordersPayMessage = ''
    },
    orderGetMyordersRequest(state) {
      state.myordersStatus = 'pending'
    },
    orderGetMyordersError(state, action) {
      state.myordersStatus = 'error'
      state.myordersMessage = action.payload
    },
    orderGetMyorders(state, action) {
      state.myordersStatus = 'success'
      state.myorders = action.payload
    },
    orderResetGetMyorders(state) {
      state.myordersStatus = ''
      state.myordersMessage = ''
      state.myorders = {}
    },
  },
})

export const orderActions = orderSlice.actions
export default orderSlice
