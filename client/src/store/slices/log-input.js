import { createSlice } from '@reduxjs/toolkit'
import { parseTags } from '../../helpers/parse-tags'

export const logInput = createSlice({
  name: 'logInput',
  initialState: {
    value: "",
    tags: []
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
      state.tags = []
    },
    update: (state, action) => {
      state.value = action.payload
      state.tags = parseTags(action.payload)
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = logInput.actions

export default logInput.reducer