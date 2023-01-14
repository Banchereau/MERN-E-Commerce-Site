import { createSlice } from '@reduxjs/toolkit'

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orders: null,
    ordersLoading: false,
    ordersError: '',
    ordersSuccess: false,
    ordersList: null,
    ordersListLoading: false,
    ordersListError: '',
    myordersLoading: false,
    myordersError: '',
    myorders: null,
    ordersPayLoading: false,
    ordersPaySuccess: false,
    ordersPayError: '',
    ordersPay: {},
    orderToDeliveredLoading: false,
    orderToDeliveredError: '',
    orderToDeliveredSuccess: false,
  },
  reducers: {
    orderAddItemRequest(state) {
      state.ordersLoading = true
      state.ordersError = ''
      state.ordersSuccess = false
    },
    orderAddItemError(state, action) {
      state.ordersLoading = false
      state.ordersError = action.payload
    },
    orderAddItem(state, action) {
      state.ordersSuccess = true
      state.ordersLoading = false
      state.orders = action.payload
    },
    orderAddItemReset(state) {
      state.ordersLoading = false
      state.ordersError = ''
      state.ordersSuccess = false
      state.orders = null
    },
    orderPayRequest(state) {
      state.ordersPayLoading = true
      state.ordersPaySuccess = false
      state.ordersPayError = ''
    },
    orderPayError(state, action) {
      state.ordersPayLoading = false
      state.ordersPayError = action.payload
    },
    orderPay(state, action) {
      state.ordersPayLoading = false
      state.ordersPay = action.payload
      state.ordersPaySuccess = true
    },
    orderToDeliveredRequest(state) {
      state.orderToDeliveredLoading = true
      state.orderToDeliveredSuccess = false
      state.orderToDeliveredError = ''
    },
    orderToDeliveredError(state, action) {
      state.orderToDeliveredLoading = false
      state.orderToDeliveredError = action.payload
    },
    orderToDelivered(state) {
      state.orderToDeliveredSuccess = true
      state.orderToDeliveredLoading = false
    },
    orderToDeliveredReset(state) {
      state.orderToDeliveredLoading = false
      state.orderToDeliveredError = ''
      state.orderToDeliveredSuccess = false
    },
    orderResetPay(state) {
      state.ordersPay = null
      state.ordersPaySuccess = false
      state.ordersPayError = ''
    },
    orderGetMyordersRequest(state) {
      state.myordersLoading = true
    },
    orderGetMyordersError(state, action) {
      state.myordersLoading = false
      state.myordersError = action.payload
    },
    orderGetMyorders(state, action) {
      state.myordersLoading = false
      state.myorders = action.payload
    },
    orderResetGetMyorders(state) {
      state.myordersError = ''
      state.myordersLoading = false
      state.myorders = null
    },
    ordersGetListRequest(state) {
      state.ordersListLoading = true
      state.ordersListError = ''
      state.ordersList = null
    },
    ordersGetListError(state, action) {
      state.ordersListLoading = false
      state.ordersListError = action.payload
    },
    ordersGetList(state, action) {
      state.ordersListLoading = false
      state.ordersList = action.payload
    },
  },
})

export const orderActions = orderSlice.actions
export default orderSlice
