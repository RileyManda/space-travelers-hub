import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// async thunk for fetching missions
export const fetchMissions = createAsyncThunk('missions/fetchMissions', async () => {
  try {
    const response = await axios.get('https://api.spacexdata.com/v3/missions');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch missions.');
  }
});

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
    joinMission: (state, action) => {
      const missionName = action.payload;
      const mission = state.missions.find((mission) => mission.mission_name === missionName);
      if (mission) {
        mission.reserved = true;
      } else {
        throw new Error('Mission not found.');
      }
    },
    leaveMission: (state, action) => {
      const missionName = action.payload;
      const mission = state.missions.find((mission) => mission.mission_name === missionName);
      if (mission) {
        mission.reserved = false;
      } else {
        throw new Error('Mission not found.');
      }
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
        state.missions = action.payload.map((mission) => ({ ...mission, reserved: false }));
      })
      .addCase(fetchMissions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export const { showContent, joinMission, leaveMission } = missionsSlice.actions;
export default missionsSlice.reducer;
