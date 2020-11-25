import React, { PureComponent } from 'react';
import { Keyboard, ScrollView, StyleSheet, FlatList, TextInput, ActivityIndicator } from 'react-native';
import {
    View,
    Text,
    KeyboardAwareFlatList,
    KeyboardAwareScrollView,
    TextField,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
    Input,
    Icon,
} from 'react-native-elements';

import { COLORS } from '../../constants';

import { formatDateAndTime } from '../../utility/util';

import * as Remote from '../../database/Remote';

export default class AddAppointmentDateScreen extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            availableDates: [],
            selectedDate: null,
            loading: false,
        }
    }

    componentDidMount() {
        this.setState({ loading: true }, async () => {
            const availableDates = await Remote.getAvailableDates();
            this.setState({ availableDates, loading: false });
        });
    }

    selectDate = selectedDate => {
        this.setState({ selectedDate });
        this.props.goToNext(selectedDate);
    }

    renderItem = ({ item }) => {
        return (
            //nao é legal fazer isso no onPress
            <ListItem key={item.id} bottomDivider onPress={() => this.selectDate(item)}>
                <ListItem.Content>
                    <ListItem.Title>{formatDateAndTime(item.date)}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    render() {
        return (
            <View flex>
                <Text text50 color={COLORS.azulSus}>
                    {'Falta pouco. Selecione a data que você poderá comparecer.'}
                </Text>
                <View flex-2 center={!!this.state.loading}>
                    {
                        this.state.loading ?
                            <ActivityIndicator size={'large'} color={COLORS.azulSus} />
                            :
                            <FlatList
                                keyboardShouldPersistTaps={'always'}
                                data={this.state.availableDates}
                                renderItem={this.renderItem}
                            />
                    }
                </View>
            </View>
        );
    }
}
