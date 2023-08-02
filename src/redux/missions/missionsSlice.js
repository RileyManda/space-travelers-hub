import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid'; // Import uuidv4 to generate unique IDs

// async thunk for fetching missions
export const fetchMissions = createAsyncThunk(
  'missions/fetchMissions',
  async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v3/missions');
      const missionsWithIds = response.data.map((mission) => ({
        ...mission,
        id: uuidv4(),
      }));
      console.log('Missions with IDs:', missionsWithIds);
      return missionsWithIds;
    } catch (error) {
      throw new Error('Failed to fetch missions.');
    }
  },
);

const initialState = {
  missions: [],
  isLoading: false,
  error: undefined,
};

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    showContent: (state) => {
      const displayText = 'Missions states';
      state.missions = displayText;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMissions.pending, (state) => {
        state.isLoading = true;
        state.error = undefined;
      })
      .addCase(fetchMissions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.missions = action.payload;
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { showContent } = missionsSlice.actions;
export default missionsSlice.reducer;
