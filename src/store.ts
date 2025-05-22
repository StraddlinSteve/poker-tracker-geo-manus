import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

// Import reducers
import geolocationReducer from './features/geolocation/geolocationSlice';
import sessionsReducer from './features/sessions/sessionsSlice';
import userReducer from './features/user/userSlice';
import pokerRoomReducer from './features/pokerRooms/pokerRoomSlice';

export const store = configureStore({
  reducer: {
    geolocation: geolocationReducer,
    sessions: sessionsReducer,
    user: userReducer,
    pokerRooms: pokerRoomReducer,
  },
});

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
