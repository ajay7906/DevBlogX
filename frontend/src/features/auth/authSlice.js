import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  error: null,
  isBlocked: false,
  blockTime: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    blockAccount: (state, action) => {
      state.isBlocked = true;
      state.blockTime = action.payload;
    },
  },
});

export const { setCredentials, logout, setAuthError, blockAccount } = authSlice.actions;
export default authSlice.reducer;