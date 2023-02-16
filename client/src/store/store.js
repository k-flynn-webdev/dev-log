import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/counter.js'

export default configureStore({
  reducer: {
    counter: counterReducer //add our reducer from step 4
  }
})