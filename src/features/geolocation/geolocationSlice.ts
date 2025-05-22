import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for geolocation state
interface PokerRoom {
  id: string;
  name: string;
  address: string;
  distance?: number;
  lat: number;
  lng: number;
}

interface GeolocationState {
  currentLocation: {
    latitude: number | null;
    longitude: number | null;
  };
  nearbyPokerRooms: PokerRoom[];
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Initial state
const initialState: GeolocationState = {
  currentLocation: {
    latitude: null,
    longitude: null,
  },
  nearbyPokerRooms: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Create slice
const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    fetchLocationStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchLocationSuccess(state, action: PayloadAction<{ latitude: number; longitude: number }>) {
      state.loading = false;
      state.currentLocation = action.payload;
      state.lastUpdated = Date.now();
    },
    fetchLocationFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    fetchNearbyRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchNearbyRoomsSuccess(state, action: PayloadAction<PokerRoom[]>) {
      state.loading = false;
      state.nearbyPokerRooms = action.payload;
      state.lastUpdated = Date.now();
    },
    fetchNearbyRoomsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    clearGeolocationData(state) {
      state.currentLocation = { latitude: null, longitude: null };
      state.nearbyPokerRooms = [];
      state.lastUpdated = null;
    },
  },
});

// Export actions and reducer
export const {
  fetchLocationStart,
  fetchLocationSuccess,
  fetchLocationFailure,
  fetchNearbyRoomsStart,
  fetchNearbyRoomsSuccess,
  fetchNearbyRoomsFailure,
  clearGeolocationData,
} = geolocationSlice.actions;

export default geolocationSlice.reducer;
