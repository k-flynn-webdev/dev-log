import { createSlice } from '@reduxjs/toolkit'
import { parseTags } from '../../helpers/parse-tags'

export const logs = createSlice({
  name: 'logs',
  initialState: [],
  reducers: {
    /**
     * Reset State
     *
     * @param state
     * @param action
     */
    reset: () => [],
    /**
     * Creates a new Log
     *
     * @param state
     * @param action
     */
    create: (state, action) => {
      const newLog = {
        id: Date.now(),
        value: action.payload,
        tags: parseTags(action.payload)
      }
      state.unshift(newLog)
    },
    /**
     * Patch existing Log
     *
     * @param state
     * @param action
     */
    patch: (state, action) => {
      const log = state.find((log) => log.id !== action.payload.id)
      if (log) {
        log.id = action.payload.id
        log.value = action.payload.value
        log.tags = action.payload.tags
      }
    },
    /**
     * Remove existing Log
     *
     * @param state
     * @param action
     */
    remove: (state, action) => {
      return state.filter((log) => log.id !== action.payload.id)
    },
  }
})

// each case under reducers becomes an action
export const { reset, create, patch, remove } = logs.actions

export default logs.reducer