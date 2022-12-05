import axios from 'axios'
import { uiActions } from '../store/ui-slice'
import { userActions } from '../store/user-slice'
import { orderActions } from '../store/order-slice'

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending login',
      })
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `/api/users/login`,
      { email, password },
      config
    )

    dispatch(userActions.getUserInfo(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Sending...',
        message: 'login successfully sent',
      })
    )
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Login Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch(userActions.removeUserInfo())
  dispatch(userActions.resetUsersList())
  dispatch(orderActions.orderResetGetMyorders())
}

export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Sending...',
        message: 'Sending register',
      })
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }
    const { data } = await axios.post(
      `/api/users`,
      { name, email, password },
      config
    )

    dispatch(userActions.getUserInfo(data))
    localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Registration Error!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch(userActions.getUserDetailsRequest())
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(userActions.getUserDetails(data))
  } catch (error) {
    dispatch(
      userActions.getUserDetailsError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.updateUserDetailsRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch(userActions.updateUserDetails(data))
  } catch (error) {
    dispatch(
      userActions.updateUserDetailsError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch(userActions.getUsersListRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users`, config)

    dispatch(userActions.getUsersList(data))
  } catch (error) {
    dispatch(
      userActions.getUsersListError(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      )
    )
  }
}

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch(userActions.deleteUserRequest())

    const config = {
      headers: {
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }

    await axios.delete(`/api/users/${id}`, config)

    dispatch(userActions.deleteUser())
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(userActions.deleteUserError(message))
  }
}

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch(userActions.updateUserDetailsRequest())

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }

    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch(userActions.updateUserDetails(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message

    dispatch(userActions.updateUserDetailsError(message))
  }
}
