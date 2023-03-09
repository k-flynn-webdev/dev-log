import { configureStore } from '@reduxjs/toolkit'
import logInput from './slices/log-input.js'
import logs from './slices/logs.js'
import user from './slices/user.js'
import error from './slices/error.js'

export default configureStore({
  reducer: {
    error,
    logInput,
    logs,
    user,
  }
})