import axios from 'axios'
import { uiActions } from '../store/ui-slice'
import { userActions } from '../store/user-slice'

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
  dispatch(userActions.removeUserInfo())
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
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Getting...',
        message: 'Getting user details',
      })
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.get(`/api/users/${id}`, config)

    dispatch(userActions.getUserDetails(data))
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Getting successfully...',
        message: 'Getting sucessfully user details',
      })
    )
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error in Getting User Details!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch(
      uiActions.showNotification({
        status: 'pending',
        title: 'Updating...',
        message: 'Updating user profile',
      })
    )
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getState().user.userInfo.token}`,
      },
    }
    const { data } = await axios.put(`/api/users/profile`, user, config)

    dispatch(userActions.getUserDetails(data))
    dispatch(
      uiActions.showNotification({
        status: 'success',
        title: 'Updating...',
        message: 'Updating sucessfully user profile',
      })
    )
  } catch (error) {
    dispatch(
      uiActions.showNotification({
        status: 'error',
        title: 'Error in Getting User Details!',
        message:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      })
    )
  }
}
