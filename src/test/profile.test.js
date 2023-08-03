import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Profile from '../components/Profile';
// import missionsReducer from '../redux/missions/missionsSlice';

const mockStore = configureStore([]);

test('renders "My Missions" title and joined missions', () => {
  const missions = [
    { mission_id: 1, mission_name: 'Mission 1', reserved: true },
    { mission_id: 2, mission_name: 'Mission 2', reserved: true },
  ];

  const store = mockStore({ missions: { missions } });

  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );

  const titleElement = screen.getByText(/My Missions/i);
  expect(titleElement).toBeInTheDocument();

  missions.forEach((mission) => {
    const missionElement = screen.getByText(mission.mission_name);
    expect(missionElement).toBeInTheDocument();
  });
});

test('renders "No joined missions yet." when no missions are reserved', () => {
  const missions = [
    { mission_id: 1, mission_name: 'Mission 1', reserved: false },
    { mission_id: 2, mission_name: 'Mission 2', reserved: false },
  ];

  const store = mockStore({ missions: { missions } });

  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );

  const titleElement = screen.getByText(/My Missions/i);
  expect(titleElement).toBeInTheDocument();

  const noMissionsElement = screen.getByText(/No joined missions yet./i);
  expect(noMissionsElement).toBeInTheDocument();
});
