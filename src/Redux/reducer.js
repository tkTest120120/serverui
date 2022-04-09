import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  isModalUser : false,
  nameRouter : "Home"
}

export const fastFoodSlice = createSlice({
  name: 'fastFood',
  initialState,
  reducers: {
    increment: (state) => {

      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    setModalUser: (state, action) => {
      state.isModalUser = action.payload ? false : true;
    },

    // reducers end
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, setModalUser } = fastFoodSlice.actions

export default fastFoodSlice.reducer