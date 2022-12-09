import axios from 'axios'
import { orderActions } from '../store/order-slice'

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.orderAddItemRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.post('/api/orders', order, config)

    dispatch(orderActions.orderAddItem(data))
  } catch (error) {
    dispatch(
      orderActions.orderAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.orderAddItemRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/${id}`, config)

    dispatch(orderActions.orderAddItem(data))
  } catch (error) {
    dispatch(
      orderActions.orderAddItemError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const payOrder =
  (orderId, paymentResult) => async (dispatch, getState) => {
    try {
      dispatch(orderActions.orderPayRequest())

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getState().user.userInfo.token}`,
        },
      }
      const { data } = await axios.put(
        `/api/orders/${orderId}/pay`,
        paymentResult,
        config
      )

      dispatch(orderActions.orderPay(data))
    } catch (error) {
      dispatch(
        orderActions.orderPayError(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message
        )
      )
    }
  }

export const deliverOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch(orderActions.orderToDeliveredRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.put(
      `/api/orders/${order._id}/deliver`,
      {},
      config
    )

    dispatch(orderActions.orderToDelivered(data))
  } catch (error) {
    dispatch(
      orderActions.orderToDeliveredError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const ListMyorders = () => async (dispatch, getState) => {
  try {
    dispatch(orderActions.orderGetMyordersRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders/myorders`, config)

    dispatch(orderActions.orderGetMyorders(data))
  } catch (error) {
    dispatch(
      orderActions.orderGetMyordersError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const ListOrders = () => async (dispatch, getState) => {
  try {
    dispatch(orderActions.ordersGetListRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/orders`, config)

    dispatch(orderActions.ordersGetList(data))
  } catch (error) {
    dispatch(
      orderActions.ordersGetListError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}
