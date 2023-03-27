import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { authSet, get, post, remove} from '../../plugins/http';
import { setStorageAccessToken } from '../../helpers/authentication';

export const fetchUser = createAsyncThunk(
  'user/updateUser',
  async (arg, thunkAPI) => {
    return get('users')
        .then(({ data }) => {
          let user = null;
          if (data && data.data && data.data.length) {
            user = data.data[0]
          }
          if (!user) throw('no user found')
          thunkAPI.dispatch({ type: 'user/updateUser', payload: user })
          return user
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

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async (arg, thunkAPI) => {
    return post('authentication', { strategy: 'local', ...arg })
        .then(({ data }) => {
          let user = data?.user ? data.user : null;
          if (!user) throw('no user found')
          thunkAPI.dispatch({ type: 'user/updateUser', payload: user })
          authSet(data.accessToken);
          setStorageAccessToken(data.accessToken);
          return user
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

export const createUser = createAsyncThunk(
  'user/createUser',
  async (arg, thunkAPI) => {
    return post('users', { ...arg })
        .then(({ data }) => {
          let user = data ? data : null;
          if (!user) throw('no user found')
          return user
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


export const isLoggedIn = state => state.user.id !== null
export const getUserID = state => state.user.id || null
export const getUserName = state => state.user.name.split(' ')[0] || state.user.email.split('@')[0].split(' ')[0]

const initUser = () => {
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
     * Reset User local data
     *
     * @param _state
     */
    resetUser: (_state) => initUser(),
    /**
     * Update User local data
     *
     * @param state
     * @param action
     */
    updateUser: (state, { payload }) => {
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
export const { resetUser, updateUser } = user.actions

export default user.reducer;
