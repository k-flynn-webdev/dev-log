import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { parseTags } from '../../helpers/parse-tags'
import { get } from '../../plugins/http';

const ITEM_LIMIT = 50

const defaultPaginate = {
  $limit: ITEM_LIMIT,
  $sort: {
    created_at: -1
  }
}

export const getLogs = createAsyncThunk(
  'logs/get',
  async (arg, thunkAPI) => {
    return get('logs', { params: { ...defaultPaginate, ...arg } })
    .then((res) => {
      thunkAPI.dispatch({
        type: 'logs/list',
        payload: res.data.data,
      })
    })
    .catch((err) => {
      thunkAPI.dispatch({
        type: 'error/setError',
        payload: err.response.data,
      })

      throw thunkAPI.rejectWithValue(err.response.data)
    })
  }
)

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
     * Replaces state with list of Logs
     *
     * @param state
     * @param action
     */
    list: (state, action) => {
      return action.payload
    },
    /**
     * Creates a new Log
     *
     * @param state
     * @param action
     */
    create: (state, action) => {
      state.unshift(action.payload)
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
        log.value = action.payload.value.trim()
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
export const { reset, create, list, patch, remove } = logs.actions

export default logs.reducer