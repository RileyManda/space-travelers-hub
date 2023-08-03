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

export const joinMission = createAsyncThunk('missions/joinMission', async (missionName, { getState }) => {
  const state = getState();
  const mission = state.missions.missions.find((mission) => mission.mission_name === missionName);
  if (mission) {
    return missionName;
  }
  throw new Error('Mission not found.');
});

export const leaveMission = createAsyncThunk('missions/leaveMission', async (missionName, { getState }) => {
  const state = getState();
  const mission = state.missions.missions.find((mission) => mission.mission_name === missionName);
  if (mission) {
    return missionName;
  }
  throw new Error('Mission not found.');
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
      })
      .addCase(joinMission.fulfilled, (state, action) => {
        const missionName = action.payload;
        // eslint-disable-next-line max-len
        state.missions = state.missions.map((mission) => (mission.mission_name === missionName ? { ...mission, reserved: true } : mission));
      })
      .addCase(leaveMission.fulfilled, (state, action) => {
        const missionName = action.payload;
        // eslint-disable-next-line max-len
        state.missions = state.missions.map((mission) => (mission.mission_name === missionName ? { ...mission, reserved: false } : mission));
      });
  },
});

export const { showContent } = missionsSlice.actions;
export default missionsSlice.reducer;
