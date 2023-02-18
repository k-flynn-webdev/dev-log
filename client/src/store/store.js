import { configureStore } from '@reduxjs/toolkit'
import logInput from './slices/log-input.js'
import logs from './slices/logs.js'

export default configureStore({
  reducer: {
    logInput,
    logs,
  }
})