import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../components/Rockets';

jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));

const mockStore = configureStore([]);

test('renders rockets data with correct details when rockets are available', () => {
  const rockets = [
    {
      id: 1, name: 'Rocket 1', description: 'Rocket 1 Description', reserved: true,
    },
  ];

  const store = mockStore({
    rockets: { rockets, isLoading: false, error: undefined },
  });

  render(
    <Provider store={store}>
      <Rockets />
    </Provider>,
  );

  rockets.forEach((rocket) => {
    const rocketNameElement = screen.getByText(rocket.name);
    expect(rocketNameElement).toBeInTheDocument();

    const rocketDescriptionElement = screen.getByText(rocket.description, { selector: 'p.rdesk' });
    expect(rocketDescriptionElement).toBeInTheDocument();

    const statusElement = screen.getByText(
      rocket.reserved ? 'Reserved' : 'NOT RESERVED',
      { selector: 'span.reserved-span' },
    );
    expect(statusElement).toBeInTheDocument();

    const buttonElement = screen.getByText(
      rocket.reserved ? 'Cancel Reservation' : 'Reserve Rocket',
      { selector: '.align-button button' },
    );
    expect(buttonElement).toBeInTheDocument();
  });
});
