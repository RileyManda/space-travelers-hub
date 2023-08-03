import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../components/Missions';

const mockStore = configureStore([]);

test('renders loading message when missions are not available', () => {
  const store = mockStore({
    missions: { missions: [], isLoading: true, error: undefined },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});

test('renders error message when there is an error fetching missions', () => {
  const errorMessage = 'Failed to fetch missions.';
  const store = mockStore({
    missions: { missions: [], isLoading: false, error: errorMessage },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const errorElement = screen.getByText(new RegExp(errorMessage, 'i'));
  expect(errorElement).toBeInTheDocument();
});

test('renders missions table with correct data when missions are available', () => {
  const missions = [
    {
      mission_id: 1, mission_name: 'Mission 1', description: 'Mission 1 Description', reserved: true,
    },
    {
      mission_id: 2, mission_name: 'Mission 2', description: 'Mission 2 Description', reserved: false,
    },
  ];

  const store = mockStore({
    missions: { missions, isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const titleElement = screen.getByText(/Mission/i);
  expect(titleElement).toBeInTheDocument();

  missions.forEach((mission) => {
    const missionNameElement = screen.getByText(mission.mission_name);
    expect(missionNameElement).toBeInTheDocument();

    const missionDescriptionElement = screen.getByText(mission.description);
    expect(missionDescriptionElement).toBeInTheDocument();

    const statusElement = screen.getByText(
      mission.reserved ? /Active Member/i : /NOT A MEMBER/i,
    );
    expect(statusElement).toBeInTheDocument();

    const buttonElement = screen.getByText(
      mission.reserved ? /Leave Mission/i : /Join Mission/i,
    );
    expect(buttonElement).toBeInTheDocument();
  });
});

test('clicking on "Join Mission" button should dispatch joinMission action', () => {
  const missions = [
    { mission_id: 1, mission_name: 'Mission 1', reserved: false },
  ];

  const store = mockStore({
    missions: { missions, isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const joinButtonElement = screen.getByText(/Join Mission/i);
  fireEvent.click(joinButtonElement);

  expect(store.getActions()).toEqual([
    { type: 'missions/joinMission/pending' },
  ]);
});

test('clicking on "Leave Mission" button should dispatch leaveMission action', () => {
  const missions = [
    { mission_id: 1, mission_name: 'Mission 1', reserved: true },
  ];

  const store = mockStore({
    missions: { missions, isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const leaveButtonElement = screen.getByText(/Leave Mission/i);
  fireEvent.click(leaveButtonElement);

  expect(store.getActions()).toEqual([
    { type: 'missions/leaveMission/pending' },
  ]);
});
