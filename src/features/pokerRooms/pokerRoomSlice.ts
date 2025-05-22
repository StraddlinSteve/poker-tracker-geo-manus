import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define types for poker room state
interface PokerRoom {
  id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  games: string[];
  hours: string;
  phoneNumber?: string;
  website?: string;
  imageUrl?: string;
  rating?: number;
  reviewCount?: number;
  isFavorite: boolean;
}

interface PokerRoomState {
  pokerRooms: PokerRoom[];
  favoriteRooms: string[]; // IDs of favorite rooms
  loading: boolean;
  error: string | null;
  lastUpdated: number | null;
}

// Initial state
const initialState: PokerRoomState = {
  pokerRooms: [],
  favoriteRooms: [],
  loading: false,
  error: null,
  lastUpdated: null,
};

// Create slice
const pokerRoomSlice = createSlice({
  name: 'pokerRooms',
  initialState,
  reducers: {
    fetchPokerRoomsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPokerRoomsSuccess(state, action: PayloadAction<PokerRoom[]>) {
      state.loading = false;
      state.pokerRooms = action.payload;
      state.lastUpdated = Date.now();
    },
    fetchPokerRoomsFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
    addFavoriteRoom(state, action: PayloadAction<string>) {
      if (!state.favoriteRooms.includes(action.payload)) {
        state.favoriteRooms.push(action.payload);
        
        // Update the isFavorite flag in the poker rooms array
        const roomIndex = state.pokerRooms.findIndex(room => room.id === action.payload);
        if (roomIndex !== -1) {
          state.pokerRooms[roomIndex].isFavorite = true;
        }
      }
    },
    removeFavoriteRoom(state, action: PayloadAction<string>) {
      state.favoriteRooms = state.favoriteRooms.filter(id => id !== action.payload);
      
      // Update the isFavorite flag in the poker rooms array
      const roomIndex = state.pokerRooms.findIndex(room => room.id === action.payload);
      if (roomIndex !== -1) {
        state.pokerRooms[roomIndex].isFavorite = false;
      }
    },
    suggestPokerRoomStart(state) {
      state.loading = true;
      state.error = null;
    },
    suggestPokerRoomSuccess(state, action: PayloadAction<PokerRoom>) {
      state.loading = false;
      state.pokerRooms.push(action.payload);
    },
    suggestPokerRoomFailure(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Export actions and reducer
export const {
  fetchPokerRoomsStart,
  fetchPokerRoomsSuccess,
  fetchPokerRoomsFailure,
  addFavoriteRoom,
  removeFavoriteRoom,
  suggestPokerRoomStart,
  suggestPokerRoomSuccess,
  suggestPokerRoomFailure,
} = pokerRoomSlice.actions;

export default pokerRoomSlice.reducer;
