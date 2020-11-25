import 'react-native';
import React from 'react';
import { render } from '@testing-library/react-native';
import SplashScreen from '../SplashScreen';

it('renders correctly', async () => {
  const { queryByText, getByTestId } = render(
    <SplashScreen />,
  );
  const agendaSusText = await queryByText('Agenda SUS');
  const loading = await getByTestId('loading');
  expect(agendaSusText).not.toBeNull();
  console.log(loading.type);
  expect(loading.type).toBe('ActivityIndicator');
});
