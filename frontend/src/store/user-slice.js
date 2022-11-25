import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    userDetails: {},
  },
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload
    },
    removeUserInfo(state, action) {
      state.userInfo = null
    },
    getUserDetails(state, action) {
      state.userDetails = action.payload
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
