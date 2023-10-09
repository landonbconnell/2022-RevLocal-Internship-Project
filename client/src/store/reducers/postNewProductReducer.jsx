import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  seller: {
    id: '',
    name: ''
  },
  title: '',
  price: 0,
  description: '',
  category: '',
  image: '',
  rating: {
    rate: 0,
    count: 0
  }
}

export const postNewProductSlice = createSlice({
  name: 'newProductListingDraft',
  initialState,
  reducers: {
    setTitle: (state, action) => {
      state.title = action.payload
    },
    setPrice: (state, action) => {
      state.price = action.payload
    },
    setDescription: (state, action) => {
      state.description = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setImage: (state, action) => {
      state.image = action.payload
    }
  }
})

export const {
  setTitle,
  setPrice,
  setDescription,
  setCategory,
  setImage
} = postNewProductSlice.actions

export default postNewProductSlice.reducer
