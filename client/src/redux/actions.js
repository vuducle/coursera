import { createSlice } from '@reduxjs/toolkit'

export const appSlice = createSlice({
  name: 'appState',
  initialState: {
    // value: 0,
    auth: false,
  },
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload
    // },
    authenticate: (state) => {
      state.auth = true;
    },
    resetLoginState: (state) => {
      state.auth = false;
    },
    onLogout: (state) => {
      state.auth = false;
    }
  },
})

// Action creators are generated for each case reducer function
export const { authenticate, onLogout, resetLoginState } = appSlice.actions

export default appSlice.reducer