import { createSlice } from '@reduxjs/toolkit'

export const logs = createSlice({
  name: 'logs',
  initialState: [],
  reducers: {
    /**
     * Reset Logs
     *
     * @param state
     * @param action
     */
    reset: () => [],
    /**
     * Create Log
     *
     * @param state
     * @param action
     */
    create: (state, action) => {
      const newLog = {
        id: Date.now(),
        value: action.payload
      }
      state.push(newLog)
    },
    /**
     * Patch Log
     *
     * @param state
     * @param action
     */
    patch: (state, action) => {
      const log = state.find((log) => log.id !== action.payload.id)
      if (log) {
        log.id = action.payload.id
        log.value = action.payload.value
      }
    },
    /**
     * Remove Log
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