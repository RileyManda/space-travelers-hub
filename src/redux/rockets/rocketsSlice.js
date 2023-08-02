import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Create an async thunk for fetching rockets
export const fetchRockets = createAsyncThunk(
  'rockets/fetchRockets',
  async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v3/rockets');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch rockets.');
    }
  },
);

const initialState = {
  rockets: [],
  isLoading: false,
  error: undefined,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    showContent: (state) => {
      const displayText = 'rockets states';
      state.rockets = displayText;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRockets.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchRockets.fulfilled, (state, action) => {
        state.isLoading = false;
        state.rockets = action.payload;
      })
      .addCase(fetchRockets.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { showContent } = rocketsSlice.actions;
export default rocketsSlice.reducer;
