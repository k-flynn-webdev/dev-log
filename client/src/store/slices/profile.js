import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { authSet, get, post, remove } from "../../plugins/http"
import { setStorageAccessToken } from "../../helpers/authentication"

export const fetchProfile = createAsyncThunk(
  "profile/updateProfile",
  async (arg, thunkAPI) => {
    return get("users")
      .then(({ data }) => {
        let profile = null
        if (data && data.data && data.data.length) {
          profile = data.data[0]
        }
        if (!profile) throw "no profile found"
        thunkAPI.dispatch({ type: "profile/updateProfile", payload: profile })
        return profile
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

export const loginProfile = createAsyncThunk(
  "profile/loginProfile",
  async (arg, thunkAPI) => {
    return post("authentication", { strategy: "local", ...arg })
      .then(({ data }) => {
        console.log("ionside111", data)
        let profile = data?.user ? data.user : null
        if (!profile) throw "no profile found"
        thunkAPI.dispatch({ type: "profile/updateProfile", payload: profile })
        authSet(data.accessToken)
        setStorageAccessToken(data.accessToken)
        return profile
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

export const createProfile = createAsyncThunk(
  "profile/createProfile",
  async (arg, thunkAPI) => {
    return post("users", { ...arg })
      .then(({ data }) => {
        let profile = data ? data : null
        if (!profile) throw "no profile found"
        return profile
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

export const lostProfile = createAsyncThunk(
  "profile/lostProfile",
  async (arg, thunkAPI) => {
    return post("users", { ...arg })
      .then(({ data }) => {
        let profile = data ? data : null
        if (!profile) throw "no profile found"
        return profile
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

export const isLoggedIn = state => state.profile.id !== null
export const getProfileID = state => state.profile.id || null
export const getProfileName = state =>
  state.profile.name.split(" ")[0] ||
  state.profile.email.split("@")[0].split(" ")[0]
export const getProfileDetails = state => state.profile || null

export const initProfile = () => {
  return {
    id: null,
    name: "",
    email: "",
    meta: "",
    log_count: 0,
    tag_count: 0,
    created_at: null,
    updated_at: null,
  }
}

export const profileProperties = Object.keys(initProfile())

export const profile = createSlice({
  name: "profile",
  initialState: initProfile(),
  reducers: {
    /**
     * Reset Profile local data
     *
     * @param _state
     */
    resetProfile: _state => initProfile(),
    /**
     * Update Profile local data
     *
     * @param state
     * @param action
     */
    updateProfile: (state, { payload }) => {
      const payLoadKeys = Object.keys(payload)

      profileProperties.forEach(key => {
        if (payLoadKeys.includes(key) && payload[key]) {
          state[key] = payload[key]
        }
      })
    },
  },
})

// each case under reducers becomes an action
export const { resetProfile, updateProfile } = profile.actions

export default profile.reducer
