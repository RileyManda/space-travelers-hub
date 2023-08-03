import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Rockets from '../components/Rockets';
​
jest.mock('axios', () => ({
  get: jest.fn(() => Promise.resolve({ data: [] })),
}));
​
const mockStore = configureStore([]);
​
test('renders rockets data with correct details when rockets are available', () => {
  const rockets = [
    {
      id: 1, name: 'Rocket 1', description: 'Rocket 1 Description', reserved: true,
    },
    {
      id: 2, name: 'Rocket 2', description: 'Rocket 2 Description', reserved: false,
    },
  ];
​
  const store = mockStore({
    rockets: { rockets, isLoading: false, error: undefined },
  });
​
  render(
    <Provider store={store}>
      <Rockets />
    </Provider>,
  );
​
  rockets.forEach((rocket) => {
    const rocketNameElement = screen.getByText(rocket.name);
    expect(rocketNameElement).toBeInTheDocument();
​
    const rocketDescriptionElement = screen.getByText(
      (content, element) => content === rocket.description && element.classList.contains('rdesk'),
    );
    expect(rocketDescriptionElement).toBeInTheDocument();
​
    const statusElement = screen.getByText(
      (content, element) => (rocket.reserved ? element.classList.contains('reserved-span') : element.textContent === 'NOT RESERVED'),
      { selector: 'p.rdesk' },
    );
    expect(statusElement).toBeInTheDocument();
​
    const buttonElement = screen.getByText(
      (content, element) => (rocket.reserved ? element.textContent === 'Cancel Reservation' : element.textContent === 'Reserve Rocket'),
      { selector: '.align-button button' },
    );
    expect(buttonElement).toBeInTheDocument();
  });
});
