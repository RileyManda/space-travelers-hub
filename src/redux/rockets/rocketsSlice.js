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

export const joinRocket = createAsyncThunk(
  'rockets/joinRocket',
  async (rocketId) => rocketId,
);

export const leaveRocket = createAsyncThunk(
  'rockets/leaveRocket',
  async (rocketId) => rocketId,
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
    // showContent: (state) => {
    //   const displayText = 'rockets states';
    //   state.rockets = displayText;
    // },
    showContent: (state, action) => {
      const { id, reserved } = action.payload;
      const rocket = state.rockets.find((rocket) => rocket.id === id);
      if (rocket) {
        rocket.reserved = reserved;
      }
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
