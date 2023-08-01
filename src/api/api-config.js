import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMissions = createAsyncThunk(
  'Missions / fetchMissions',
  async () => {
    try {
      const response = await axios.get('https://api.spacexdata.com/v3/missions');
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch missions.');
    }
  },
);
export default fetchMissions;
