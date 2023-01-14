import { createSlice } from '@reduxjs/toolkit'

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: userInfoFromStorage,
    userInfoLoading: false,
    userInfoError: '',
    userDetails: null,
    userDetailsLoading: false,
    userDetailsError: '',
    userUpdateDetailsLoading: false,
    userUpdateDetailsError: '',
    userUpdateDetailsSuccess: false,
    usersList: [],
    usersListStatus: '',
    usersListMessage: '',
    userDeleteStatus: '',
    userDeleteMessage: '',
  },
  reducers: {
    getUserInfo(state, action) {
      state.userInfo = action.payload
      state.userInfoLoading = false
    },
    getUserInfoRequest(state) {
      state.userInfoLoading = true
      state.userInfoError = ''
    },
    getUserInfoError(state, action) {
      state.userInfoError = action.payload
      state.userInfoLoading = false
    },
    removeUserInfo(state, action) {
      state.userInfo = null
    },
    getUserDetailsRequest(state) {
      state.userDetailsLoading = true
    },
    getUserDetailsError(state, action) {
      state.userDetailsError = action.payload
      state.userDetailsLoading = false
    },
    getUserDetails(state, action) {
      state.userDetails = action.payload
      state.userDetailsError = ''
      state.userDetailsLoading = false
    },
    updateUserDetailsRequest(state) {
      state.userUpdateDetailsLoading = true
      state.userUpdateDetailsSuccess = false
      state.userUpdateDetailsError = ''
    },
    updateUserDetailsError(state, action) {
      state.userUpdateDetailsError = action.payload
      state.userUpdateDetailsLoading = false
    },
    updateUserDetails(state, action) {
      state.userDetails = action.payload
      state.userUpdateDetailsLoading = false
      state.userUpdateDetailsSuccess = true
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
