import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  input: ''
}

export const searchBarSlice = createSlice({
  name: 'searchbar',
  initialState,
  reducers: {
    setSearchBarInput: (state, action) => {
      state.input = action.payload.input
    },
    resetSearchBarInput: state => {
      state.input = initialState.input
    }
  }
})

export const { setSearchBarInput, resetSearchBarInput } = searchBarSlice.actions

export default searchBarSlice.reducer
