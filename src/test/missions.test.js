import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../components/Missions';

// import { joinMission, leaveMission } from '../redux/missions/missionsSlice';
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));
const mockStore = configureStore([]);

describe('Missions Component', () => {
  it('should display the buttons', () => {
    const store = mockStore({
      missions: {
        missions: [
          {
            mission_id: 1,
            mission_name: 'Mission 1',
            description: 'Description of Mission 1',
            reserved: false,
          },
          {
            mission_id: 2,
            mission_name: 'Mission 2',
            description: 'Description of Mission 2',
            reserved: true,
          },
        ],
        isLoading: false,
        error: null,
      },
    });

    render(
      <Provider store={store}>
        <Missions />
      </Provider>,
    );

    const joinButton = screen.getByRole('button', { name: 'Join Mission' });
    const leaveButton = screen.getByRole('button', { name: 'Leave Mission' });
    expect(joinButton).toBeInTheDocument();
    expect(leaveButton).toBeInTheDocument();
  });
});
