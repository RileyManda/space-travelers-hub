import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRockets = createAsyncThunk('rockets/fetchRockets', async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/rockets');
    return response.data.map((rocket) => ({
      id: rocket.id,
      name: rocket.rocket_name,
      description: rocket.description,
      flickr_images: rocket.flickr_images[0],
      reserved: false,
    }));
  } catch (error) {
    throw new Error('Failed to fetch rockets.');
  }
});

const initialState = {
  rockets: [],
  isLoading: false,
  error: undefined,
};

const rocketsSlice = createSlice({
  name: 'rockets',
  initialState,
  reducers: {
    showContent: (state, action) => {
      const { id, reserved } = action.payload;
      const rocket = state.rockets.find((rocket) => rocket.id === id);
      if (rocket) {
        rocket.reserved = reserved;
      }
    },
    joinRocket: (state, action) => {
      const rocketId = action.payload;
      // eslint-disable-next-line max-len
      state.rockets = state.rockets.map((rocket) => (rocket.id === rocketId ? { ...rocket, reserved: true } : rocket));
    },
    leaveRocket: (state, action) => {
      const rocketId = action.payload;
      // eslint-disable-next-line max-len
      state.rockets = state.rockets.map((rocket) => (rocket.id === rocketId ? { ...rocket, reserved: false } : rocket));
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

export const { showContent, joinRocket, leaveRocket } = rocketsSlice.actions;
export default rocketsSlice.reducer;
