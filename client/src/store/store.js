import { configureStore } from '@reduxjs/toolkit'
import logInput from './slices/logInput.js'

export default configureStore({
  reducer: {
    logInput: logInput //add our reducer from step 4
  }
})