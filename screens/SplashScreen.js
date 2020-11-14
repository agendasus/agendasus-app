import * as React from 'react';
import {
    LoaderScreen,
} from 'react-native-ui-lib';

import { CORES } from '../constants';

export default class SplashScreen extends React.Component {

    render() {
        return (
            <LoaderScreen loaderColor={CORES.azulSus} message={'Agenda SUS'} messageStyle={{ color: CORES.azulSus, fontSize: 20, fontWeight: 'bold' }}>
            </LoaderScreen>
        );
    }
}
