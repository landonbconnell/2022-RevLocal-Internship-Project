import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loggedInUser: {
    userId: '',
    username: '',
    firstName: '',
    lastName: '',
    isShopSetUp: ''
  },
  isLoggedIn: false
}

export const logInSlice = createSlice({
  name: 'logIn',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLoggedIn = true
      state.loggedInUser = action.payload
    },
    logOut: state => {
      state.isLoggedIn = false
      state.loggedInUser = initialState.loggedInUser
    }
  }
})

export const { logIn, logOut } = logInSlice.actions
export default logInSlice.reducer
