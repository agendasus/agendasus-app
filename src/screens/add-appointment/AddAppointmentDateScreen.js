import React, { PureComponent } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
    Text,
    View,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
    SearchBar,
} from 'react-native-elements';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

export default class AddAppointmentDateScreen extends PureComponent {
    state = {
        appointmentLocal: [],
        showAppointmentTypes: false,
        selectedType: null,
    }

    async componentDidMount() {
        const appointmentLocal = await Remote.getAppointmentTypes();
        this.setState({ appointmentLocal });
    }
    goToLocal = () => {
        alert('');
    }



    render() {
        return (
            <View>
                <Text text50>
                    Estas são as datas disponíveis para você escolher.
                </Text>
                <SearchBar
                />
                <FlatList
                />
            </View>
        );
    }
}
