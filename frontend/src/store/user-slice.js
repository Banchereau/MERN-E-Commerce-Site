import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    userDetails: {},
    userDetailsStatus: '',
    userDetailsMessage: '',
    userUpdateDetailsStatus: '',
    userUpdateDetailsMessage: '',
    usersList: [],
    usersListStatus: '',
    usersListMessage: '',
    userDeleteStatus: '',
    userDeleteMessage: '',
  },
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload
    },
    removeUserInfo(state, action) {
      state.userInfo = null
    },
    getUserDetailsRequest(state) {
      state.userDetailsStatus = 'pending'
    },
    getUserDetailsError(state, action) {
      state.userDetailsMessage = action.payload
      state.userDetailsStatus = 'error'
    },
    getUserDetails(state, action) {
      state.userDetails = action.payload
      state.userDetailsMessage = ''
      state.userDetailsStatus = 'success'
    },
    updateUserDetailsRequest(state) {
      state.userUpdateDetailsStatus = 'pending'
    },
    updateUserDetailsError(state, action) {
      state.userUpdateDetailsMessage = action.payload
      state.userUpdateDetailsStatus = 'error'
    },
    updateUserDetails(state, action) {
      state.userDetails = action.payload
      state.userUpdateDetailsMessage = ''
      state.userUpdateDetailsStatus = 'success'
    },
    updateResetUserDetails(state) {
      state.userDetails = {}
      state.userUpdateDetailsMessage = ''
      state.userUpdateDetailsStatus = ''
    },
    getUsersListRequest(state) {
      state.usersListStatus = 'pending'
    },
    getUsersListError(state, action) {
      state.usersListMessage = action.payload
      state.usersListStatus = 'error'
    },
    getUsersList(state, action) {
      state.usersList = action.payload
      state.usersListMessage = ''
      state.usersListStatus = 'success'
    },
    resetUsersList(state) {
      state.usersList = []
      state.usersListMessage = ''
      state.usersListStatus = ''
    },
    deleteUserRequest(state) {
      state.userDeleteStatus = 'pending'
    },
    deleteUserError(state, action) {
      state.userDeleteMessage = action.payload
      state.userDeleteStatus = 'error'
    },
    deleteUser(state) {
      state.userDeleteMessage = ''
      state.userDeleteStatus = 'success'
    },
  },
})

export const userActions = userSlice.actions
export default userSlice
