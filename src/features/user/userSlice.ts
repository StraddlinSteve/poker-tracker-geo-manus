import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for user state
interface User {
  id: string;
  email: string;
  username: string;
  subscription: {
    type: 'free' | 'monthly' | 'annual';
    expiresAt: string | null;
    active: boolean;
  };
  preferences: {
    currency: string;
    defaultGameType: string;
    darkMode: boolean;
    notifications: {
      sessionReminders: boolean;
      nearbyPokerRooms: boolean;
      appUpdates: boolean;
    };
  };
  createdAt: string;
  updatedAt: string;
}

interface UserState {
  currentUser: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: UserState = {
  currentUser: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// Create slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginStart(state) {
      state.loading = true;
      state.error = null;
    },
    loginSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    loginFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    },
    registerStart(state) {
      state.loading = true;
      state.error = null;
    },
    registerSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    registerFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    logoutStart(state) {
      state.loading = true;
    },
    logoutSuccess(state) {
      state.loading = false;
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    updateUserStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateUserSuccess(state, action: PayloadAction<User>) {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSubscriptionStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSubscriptionSuccess(state, action: PayloadAction<User['subscription']>) {
      state.loading = false;
      if (state.currentUser) {
        state.currentUser.subscription = action.payload;
      }
    },
    updateSubscriptionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updatePreferencesStart(state) {
      state.loading = true;
      state.error = null;
    },
    updatePreferencesSuccess(state, action: PayloadAction<User['preferences']>) {
      state.loading = false;
      if (state.currentUser) {
        state.currentUser.preferences = action.payload;
      }
    },
    updatePreferencesFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

// Export actions and reducer
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutStart,
  logoutSuccess,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  updateSubscriptionStart,
  updateSubscriptionSuccess,
  updateSubscriptionFailure,
  updatePreferencesStart,
  updatePreferencesSuccess,
  updatePreferencesFailure,
  clearError,
} = userSlice.actions;

export default userSlice.reducer;
