import 'react-native';
import React from 'react';
import { formatDateAndTime, formatDateWithoutTime } from '../util';
import { render, fireEvent } from '@testing-library/react-native';

it('Deve retornar uma data no formato DD/MM/YYYY HH:mm', async () => {
    const date = new Date('10/20/2020');
    const dateAsString = formatDateAndTime(date);
    expect(dateAsString).toBe('20/10/2020 00:00');
});
it('Deve retornar uma data no formato DD/MM/YYYY', async () => {
    const date = new Date('10/20/2020');
    const dateAsString = formatDateWithoutTime(date);
    expect(dateAsString).toBe('20/10/2020');
});
