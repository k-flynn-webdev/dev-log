import { createSlice } from '@reduxjs/toolkit'

export const logInput = createSlice({
  name: 'logInput',
  initialState: {
    value: ""
  },
  reducers: {
    /**
     * Reset Log Input
     *
     * @param state
     * @param action
     */
    reset: (state) => {
      state.value = ""
    },
    update: (state, action) => {
      state.value = action.payload
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = logInput.actions

export default logInput.reducer