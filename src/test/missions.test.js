import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Missions from '../components/Missions';

const mockStore = configureStore([]);

test('renders loading text when data is loading', () => {
  const store = mockStore({
    missions: { missions: [], isLoading: true, error: null },
  });

  render(
    <Provider store={store}>
      <Missions />
    </Provider>,
  );

  const loadingElement = screen.getByText(/Loading.../i);
  expect(loadingElement).toBeInTheDocument();
});
