import { createSlice } from '@reduxjs/toolkit'

export const hasError = state => state.error?.message?.length
export const getErrorMessage = state => state.error?.message || ""

const initError = () => {
  return {
    title: '',
    message: '',
    detail: '',
  }
}

export const error = createSlice({
  name: 'error',
  initialState: initError(),
  reducers: {
    /**
     * Reset Error
     *
     * @param state
     * @param action
     */
    clearError: (state) => initError(),
    setError: (state, { payload }) => {
      const keys = ['title','message','detail'];
      const payLoadKeys = Object.keys(payload)

      keys.forEach((key) => {
        if(payLoadKeys.includes(key) && payload[key]) {
          state[key] = payload[key];
        }
      })
    },
  },
})

// each case under reducers becomes an action
export const { clearError, setError } = error.actions

export default error.reducer;
