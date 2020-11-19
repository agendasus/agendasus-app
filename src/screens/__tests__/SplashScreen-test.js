import 'react-native';
import React from 'react';
import SplashScreen from '../SplashScreen';
import { render, fireEvent } from '@testing-library/react-native';

it('renders correctly', async () => {
    const { toJSON, queryByText, getByTestId } = render(
        <SplashScreen />
    );
    const agendaSusText = await queryByText('Agenda SUS');
    const loading = await getByTestId('loading');
    expect(agendaSusText).not.toBeNull();
    console.log(loading.type);
    expect(loading.type).toBe('ActivityIndicator');

});
