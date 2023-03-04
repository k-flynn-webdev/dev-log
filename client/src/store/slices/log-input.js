import { createSlice } from '@reduxjs/toolkit'
import { parseTags } from '../../helpers/parse-tags'

const initLog = () => {
  return {
    id: '',
    value: "",
    tags: []
  }
}

export const logValue = state => state.logInput.value
export const logTags = state => state.logInput.tags

export const logInput = createSlice({
  name: 'logInput',
  initialState: initLog(),
  reducers: {
    /**
     * Reset Log Input
     *
     * @param state
     * @param action
     */
    reset: (state) => initLog(),
    update: (state, { payload }) => {
      state.value = payload
      state.tags = parseTags(payload)
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = logInput.actions

export default logInput.reducer