import { createSlice } from '@reduxjs/toolkit'
import { useParams } from 'react-router-dom'

const { page } = useParams

const initialState = {
  page,
  totalPages: 1
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTotalPages: (state, action) => {
        state.totalPages = action.payload
    },
    setPage: (state, action) => {
      state.page = action.payload
    },
    toPreviousPage: state => {
        if (state.page > 1) { 
            state.page-- 
        }
    },
    toNextPage: state => {
        if (state.page < state.totalPagess) {
            state.page++
        }
    }
  }
})

export const { setTotalPages, setPage, toPreviousPage, toNextPage } = pageSlice.actions
export default pageSlice.reducer
