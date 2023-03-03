import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, remove } from "../../plugins/http";

export const fetchUser = createAsyncThunk(
  'user/update',
  async (arg, thunkAPI) => {
    return get('users')
        .then(({ data }) => {
          let user = null;
          if (data && data.data && data.data.length) {
            user = data.data[0]
          }
          if (!user) throw('no user found')
          thunkAPI.dispatch({ type: 'user/update', payload: user })
          return user
    })
  }
)

export const user = createSlice({
  name: 'user',
  initialState: {
    id: '',
    name: '',
    email: '',
    meta: ''
  },
  reducers: {
    /**
     * Reset User
     *
     * @param state
     * @param action
     */
    reset: (state) => {
      state.id = null;
      state.name = '';
      state.email = '';
      state.meta = '';
    },
    update: (state, { payload }) => {
      const keys = ['id','name','email','meta'];
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
export const { reset, update } = user.actions

export default user.reducer