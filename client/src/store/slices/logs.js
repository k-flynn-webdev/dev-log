import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { get, patch, remove } from "../../plugins/http"

const ITEM_LIMIT = 50

const defaultPaginate = {
  $limit: ITEM_LIMIT,
  $sort: {
    created_at: -1,
  },
}

export const getLogs = createAsyncThunk("logs/get", async (arg, thunkAPI) => {
  return get("logs", { params: { ...defaultPaginate, ...arg } })
    .then(res => {
      thunkAPI.dispatch({
        type: "logs/listLogs",
        payload: res.data.data,
      })
    })
    .catch(err => {
      thunkAPI.dispatch({
        type: "error/setError",
        payload: err.response.data,
      })

      throw thunkAPI.rejectWithValue(err.response.data)
    })
})

export const patchLogAPI = createAsyncThunk(
  "logs/patchAPI",
  async (arg, thunkAPI) => {
    return patch(`logs/${arg.id}`, { value: arg.value })
      .then(res => {
        thunkAPI.dispatch({
          type: "logs/patchLog",
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

export const removeLogAPI = createAsyncThunk(
  "logs/removeAPI",
  async (arg, thunkAPI) => {
    return remove(`logs/${arg.id}`)
      .then(res => {
        thunkAPI.dispatch({
          type: "logs/removeLog",
          payload: arg.id,
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

export const logList = state => state.logs
export const getByLogId = id => state => state.logs.find(item => item.id === id)

export const logs = createSlice({
  name: "logs",
  initialState: [],
  reducers: {
    /**
     * Reset State
     *
     * @param state
     * @param action
     */
    resetLogs: () => [],
    /**
     * Replaces state with list of Logs
     *
     * @param state
     * @param action
     */
    listLogs: (state, action) => {
      return action.payload
    },
    /**
     * Creates a new Log
     *
     * @param state
     * @param action
     */
    addLog: (state, action) => {
      state.unshift(action.payload)
    },
    /**
     * Patch existing Log
     *
     * @param state
     * @param action
     */
    patchLog: (state, action) => {
      const log = state.find(log => log.id === action.payload.id)
      if (log) {
        log.value = action.payload.value.trim()
      }
    },
    /**
     * Remove existing Log
     *
     * @param state
     * @param action
     */
    removeLog: (state, action) => {
      return state.filter(log => log.id !== action.payload.id)
    },
  },
})

// each case under reducers becomes an action
export const { resetLogs, listLogs, addLog, patchLog, removeLog } = logs.actions

export default logs.reducer
