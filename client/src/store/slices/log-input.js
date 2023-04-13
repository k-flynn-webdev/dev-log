import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { post } from "../../plugins/http"

const initLog = () => {
  return {
    id: "",
    value: "",
    tags: [],
  }
}

export const logValue = state => state.logInput.value
export const logTags = state => state.logInput.tags

export const create = createAsyncThunk(
  "logInput/create",
  async (arg, thunkAPI) => {
    return post("logs", {
      value: logValue(thunkAPI.getState()),
    })
      .then(res => {
        thunkAPI.dispatch({
          type: "logs/addLog",
          payload: res.data,
        })
      })
      .catch(err => {
        thunkAPI.dispatch({
          type: "error/setError",
          payload: err.response.data,
        })

        throw thunkAPI.rejectWithValue(err.response.data)
      })
  }
)

// todo: combine logs and log states for ease of future data

export const logInput = createSlice({
  name: "logInput",
  initialState: initLog(),
  reducers: {
    /**
     * Reset Log Input
     *
     * @param state
     * @param action
     */
    reset: state => initLog(),
    update: (state, { payload }) => {
      state.value = payload
      state.tags = []
    },
  },
})

// each case under reducers becomes an action
export const { reset, update } = logInput.actions

export default logInput.reducer
