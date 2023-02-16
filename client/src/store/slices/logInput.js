import { createSlice } from '@reduxjs/toolkit'

export const logInput = createSlice({
  name: 'logInput',
  initialState: {
    value: ""
  },
  reducers: {
    update: (state, action) => {
      state.value = action.payload
    },
  }
})

// each case under reducers becomes an action
export const { update } = logInput.actions

export default logInput.reducer