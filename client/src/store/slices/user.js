import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { get, post, remove } from "../../plugins/http";

export const getUserAPI = async (dispatch) => {
  get('users')
    .then(({ data }) => {
      dispatch({ type: 'user/update', payload: data })
      return data
    })
    .catch((error) => {
      console.log(error)
      throw error;
    })
};

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
    update: (state, action) => {
      const keys = ['id','name','email','meta'];
      Object.keys(action).forEach((key) => {
        if(keys.includes(key)) {
          state[key] = action[key];
        }
      })
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = user.actions

export default user.reducer