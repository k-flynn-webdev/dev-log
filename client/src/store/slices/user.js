import { createSlice } from '@reduxjs/toolkit'

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
      state.id = action.id;
      state.name = action.name;
      state.email = action.email;
      state.meta = action.meta;
    },
  }
})

// each case under reducers becomes an action
export const { reset, update } = user.actions

export default user.reducer