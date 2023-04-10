import { configureStore } from "@reduxjs/toolkit"
import logInput from "./slices/log-input.js"
import logs from "./slices/logs.js"
import profile from "./slices/profile.js"
import error from "./slices/error.js"

export default configureStore({
  reducer: {
    error,
    logInput,
    logs,
    profile,
  },
})
