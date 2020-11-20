import * as React from 'react';
import {
    Text,
    LoaderScreen,
} from 'react-native-ui-lib';

import { COLORS } from '../constants';

export default class SplashScreen extends React.Component {

    render() {
        return (
            <LoaderScreen testID={'home'} loaderColor={COLORS.azulSus} message={'Agenda SUS'} messageStyle={{ color: COLORS.azulSus, fontSize: 20, fontWeight: 'bold' }}>
            </LoaderScreen>
        );
    }
}
