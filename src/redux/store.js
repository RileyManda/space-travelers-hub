import { configureStore } from '@reduxjs/toolkit';
import missionReducer from './missions/missionsSlice';

const store = configureStore({
  reducer: {
    missions: missionReducer,

  },
});
export default store;
