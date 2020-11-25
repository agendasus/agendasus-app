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

import * as Remote from '../../database/Remote';

import SearchBar from '../../components/SearchBar';

const SEARCH_DELAY = 1000;

export default class AddAppointmentLocalScreen extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            appointmentLocal: [],
            showappointmentLocal: false,
            selectedLocal: null,
            loading: false,
        }
    }

    findLocal = async text => {
        if (!text) {
            this.setState({ appointmentLocal: [], loading: false });
            return;
        }
        this.setState({ loading: true }, async () => {
            const appointmentLocal = await Remote.getAppointmentLocal(text);
            this.setState({ appointmentLocal, loading: false });
        });
    }

    selectLocal = selectedLocal => {
        this.setState({ selectedLocal });
        this.props.goToNext(selectedLocal);
    }

    renderItem = ({ item }) => {
        return (
            //nao é legal fazer isso no onPress
            <ListItem key={item.id} bottomDivider onPress={() => this.selectLocal(item)}> 
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    render() {
        return (
            <View flex>
                <Text text50 color={COLORS.azulSus}>
                    {'Muito bem, agora você precisa nos dizer o local.'}
                </Text>
                <View>
                    <SearchBar search={this.findLocal} />
                </View>
                <View flex-2 center={!!this.state.loading}>
                    {
                        this.state.loading ?
                            <ActivityIndicator size={'large'} color={COLORS.azulSus} />
                            :
                            <FlatList
                                keyboardShouldPersistTaps={'always'}
                                data={this.state.appointmentLocal}
                                renderItem={this.renderItem}
                            />
                    }
                </View>
            </View>
        );
    }
}
