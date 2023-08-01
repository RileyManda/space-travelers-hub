import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const missionsSlice = createSlice({
  name: 'missions',
  initialState,
  reducers: {
    showContent: () => {
      const displayText = 'Missions states will update here';
      return [displayText];
    },
  },
});

export const { showContent } = missionsSlice.actions;
export default missionsSlice.reducer;
