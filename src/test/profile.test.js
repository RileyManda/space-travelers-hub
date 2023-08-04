import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Profile from '../components/Profile';

const mockStore = configureStore([]);

test('renders joined missions when missions are available', () => {
  const missions = [
    { mission_id: 1, mission_name: 'Mission 1', reserved: true },
    { mission_id: 2, mission_name: 'Mission 2', reserved: true },
  ];

  const store = mockStore({
    missions: { missions, isLoading: false, error: undefined },
    rockets: { rockets: [], isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );

  const mission1Element = screen.getByText('Mission 1');
  const mission2Element = screen.getByText('Mission 2');

  expect(mission1Element).toBeInTheDocument();
  expect(mission2Element).toBeInTheDocument();
});

test('renders "No joined missions yet." when no missions are available', () => {
  const store = mockStore({
    missions: { missions: [], isLoading: false, error: undefined },
    rockets: { rockets: [], isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );

  const noMissionsElement = screen.getByText('No joined missions yet.');

  expect(noMissionsElement).toBeInTheDocument();
});

test('No joined rockets reserved', () => {
  const store = mockStore({
    rockets: { rockets: [], isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Profile />
    </Provider>,
  );

  const noMissionsElement = screen.getByText('No rockets reserved.');

  expect(noMissionsElement).toBeInTheDocument();
});
