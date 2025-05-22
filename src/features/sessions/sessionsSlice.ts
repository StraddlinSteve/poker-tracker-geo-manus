import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for session state
interface Session {
  id: string;
  venue: string;
  venueType: 'Live' | 'Home' | 'Online';
  gameType: string;
  buyIn: number;
  cashOut: number;
  profit: number;
  startTime: string;
  endTime: string;
  duration: string;
  notes?: string;
  location?: {
    latitude: number;
    longitude: number;
    address: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface SessionsState {
  sessions: Session[];
  currentSession: Session | null;
  loading: boolean;
  error: string | null;
  freeSessionsLeft: number;
}

// Initial state
const initialState: SessionsState = {
  sessions: [],
  currentSession: null,
  loading: false,
  error: null,
  freeSessionsLeft: 10, // Start with 10 free sessions
};

// Create slice
const sessionsSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    fetchSessionsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSessionsSuccess(state, action: PayloadAction<Session[]>) {
      state.loading = false;
      state.sessions = action.payload;
    },
    fetchSessionsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    createSessionStart(state) {
      state.loading = true;
      state.error = null;
    },
    createSessionSuccess(state, action: PayloadAction<Session>) {
      state.loading = false;
      state.sessions.push(action.payload);
      state.currentSession = action.payload;
      
      // Decrement free sessions if user is on free plan
      if (state.freeSessionsLeft > 0) {
        state.freeSessionsLeft -= 1;
      }
    },
    createSessionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    updateSessionStart(state) {
      state.loading = true;
      state.error = null;
    },
    updateSessionSuccess(state, action: PayloadAction<Session>) {
      state.loading = false;
      const index = state.sessions.findIndex(session => session.id === action.payload.id);
      if (index !== -1) {
        state.sessions[index] = action.payload;
      }
      state.currentSession = action.payload;
    },
    updateSessionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSessionStart(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSessionSuccess(state, action: PayloadAction<string>) {
      state.loading = false;
      state.sessions = state.sessions.filter(session => session.id !== action.payload);
      state.currentSession = null;
    },
    deleteSessionFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    setCurrentSession(state, action: PayloadAction<string>) {
      state.currentSession = state.sessions.find(session => session.id === action.payload) || null;
    },
    clearCurrentSession(state) {
      state.currentSession = null;
    },
    resetFreeSessionsCount(state, action: PayloadAction<number>) {
      state.freeSessionsLeft = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  fetchSessionsStart,
  fetchSessionsSuccess,
  fetchSessionsFailure,
  createSessionStart,
  createSessionSuccess,
  createSessionFailure,
  updateSessionStart,
  updateSessionSuccess,
  updateSessionFailure,
  deleteSessionStart,
  deleteSessionSuccess,
  deleteSessionFailure,
  setCurrentSession,
  clearCurrentSession,
  resetFreeSessionsCount,
} = sessionsSlice.actions;

export default sessionsSlice.reducer;
