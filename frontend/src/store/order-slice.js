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
    orderToDeliveredStatus: '',
    orderToDeliveredMessage: '',
    myorders: null,
    myordersStatus: '',
    myordersMessage: '',
    ordersList: null,
    ordersListStatus: '',
    ordersListMessage: '',
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
      state.ordersPayStatus = 'success'
    },
    orderToDeliveredRequest(state) {
      state.orderToDeliveredStatus = 'pending'
    },
    orderToDeliveredError(state, action) {
      state.orderToDeliveredStatus = 'error'
      state.orderToDeliveredMessage = action.payload
    },
    orderToDelivered(state) {
      state.orderToDeliveredStatus = 'success'
    },
    orderToDeliveredReset(state) {
      state.orderToDeliveredStatus = ''
      state.orderToDeliveredMessage = ''
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
    ordersGetListRequest(state) {
      state.ordersListStatus = 'pending'
    },
    ordersGetListError(state, action) {
      state.ordersListStatus = 'error'
      state.ordersListMessage = action.payload
    },
    ordersGetList(state, action) {
      state.ordersListStatus = 'success'
      state.ordersList = action.payload
    },
  },
})

export const orderActions = orderSlice.actions
export default orderSlice
