import { configureStore } from '@reduxjs/toolkit';

import lobbyReducer from '../slices/lobbySlice';
import authReducer from '../slices/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    lobby: lobbyReducer,
  },
});
