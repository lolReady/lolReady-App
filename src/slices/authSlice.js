import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isConnection: false,
  token: -1,
};

export const authSlice = createSlice({
  name: 'Auth',
  initialState,
  reducers: {
    restoreToken: (state, action) => {
      state.token = action.payload;
    },
    setConnection: (state, action) => {
      state.isConnection = action.payload;
    },
  },
});

export const { restoreToken, setConnection } = authSlice.actions;
export default authSlice.reducer;
