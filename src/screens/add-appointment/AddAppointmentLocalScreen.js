import React, { PureComponent } from 'react';
import { Keyboard, ScrollView, StyleSheet, FlatList } from 'react-native';
import {
    View,
    Text,
    KeyboardAwareFlatList,
    KeyboardAwareScrollView,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
    SearchBar,
} from 'react-native-elements';
import debounce from 'lodash/debounce';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

const SEARCH_DELAY = 1000;

export default class AddAppointmentLocalScreen extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            appointmentLocal: [],
            showappointmentLocal: false,
            selectedLocal: null,
            searchValue: '',
            loading: false,
        }
        this.findLocal = debounce(this.findLocal.bind(this), SEARCH_DELAY);
    }

    async findLocal() {
        if (!this.state.searchValue) {
            return;
        }
        const appointmentLocal = await Remote.getAppointmentLocal(this.state.searchValue);
        this.setState({ appointmentLocal, loading: false });
    }

    selectLocal = selectedLocal => {
        this.setState({ selectedLocal });
    }

    renderItem = ({ item }) => {
        return (
            <ListItem key={item.id} bottomDivider onPress={this.selectLocal}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }

    search = searchValue => {
        if (!searchValue) {
            this.setState({ searchValue, appointmentLocal: [] });
            return;
        }
        this.setState({ searchValue, loading: true }, () => {
            this.findLocal();
        });
    }

    onClearSearchField = () => {
        Keyboard.dismiss();
    }

    render() {
        return (
            <View flex>
                <Text text50 color={COLORS.azulSus}>
                    Muito bem, agora você precisa nos dizer o local.
                </Text>
                <ScrollView keyboardShouldPersistTaps={'always'} style={{ borderWidth: 1 }}>
                    <SearchBar
                        // platform={'default'}
                        // lightTheme 
                        platform={'android'}
                        value={this.state.searchValue}
                        onChangeText={this.search}
                        searchIcon={null}
                        cancelIcon={null}
                        placeholder={'Digite o nome ou endereço do local'}
                        showLoading={true}
                        loadingProps={{ size: 'large' }}
                        underlineColorAndroid={COLORS.cinzaDesabilitado}
                        onClear={this.onClearSearchField}
                    // containerStyle={{ width: '100%' }}
                    // inputContainerStyle={{ padding: 0, margin: 0 }}
                    />
                </ScrollView>
                <View flex-2>
                    <FlatList
                        keyboardShouldPersistTaps='always'
                        data={this.state.appointmentLocal}
                        renderItem={this.renderItem}
                    />
                </View>
            </View>
        );
    }
}
