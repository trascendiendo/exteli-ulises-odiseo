import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uid: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
  gender: '',
  status: '',
  lastConnection: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      return {...state, ...action.payload}
    },
    clearUser: () => {
      return initialState
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
