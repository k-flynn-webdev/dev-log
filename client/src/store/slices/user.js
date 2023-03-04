import { createSlice, createAsyncThunk, use } from '@reduxjs/toolkit'
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
    // todo: enable throw error in react??
    // todo: error not being serializable breaks this with catch(e) ?
  }
)

export const isLoggedIn = state => state.user.id !== null
export const getUserID = state => state.user.id || null
export const getUserName = state => state.user.name.split(' ')[0] || state.user.email.split('@')[0].split(' ')[0]

const initUser = () => {
  console.log('init user')
  return {
    id: null,
    name: '',
    email: '',
    meta: ''
  }
}

export const user = createSlice({
  name: 'user',
  initialState: initUser(),
  reducers: {
    /**
     * Reset User
     *
     * @param state
     * @param action
     */
    reset: (state) => initUser(),
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

export default user.reducer;
