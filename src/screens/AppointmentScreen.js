import * as React from 'react';
import { ActivityIndicator, ScrollView, View, Alert, FlatList, StyleSheet, TextInput, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {
    Text,
    Card,
    ColorName,
} from 'react-native-ui-lib';
import {
    Button,
    SearchBar,
    ButtonGroup,
} from 'react-native-elements';
import ActionSheet from "react-native-actions-sheet";
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements';

import FAB from '../components/FAB';
import { COLORS, ROUTES } from '../constants';

import { formatDateAndTime } from '../utility/util';

import HeaderWithSearch from '../components/HeaderWithSearch';

import * as Remote from '../database/Remote';

const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});

export default class AppointmentScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            showOptions: false,
            selectedItemId: null,
            selectedFilters: [],
        }
        this.actionSheetRef = React.createRef();
    }

    async componentDidMount() {

        await this.loadData();
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            await this.loadData();
        });
    }
    loadData = () => {
        this.setState({ loading: true }, async () => {
            const data = await Remote.getAppointments();
            this.setState({ loading: false, data });
        });
    }

    updateAppointment = async (data) => {

    }

    showOptions = (itemId) => {
        this.setState({ showOptions: true, selectedItemId: itemId });
        this.actionSheetRef.current?.setModalVisible();
    }
    showConfirmationAlert = () => {
        Alert.alert(
            'Presença confirmada',
            'Legal, sua presença está confirmada.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    }
    showCancelAlert = () => {
        Alert.alert(
            'Presença cancelada',
            'Que pena, sua presença foi cancelada.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    }
    cancelEvent = () => {
        this.actionSheetRef.current?.setModalVisible(false);
        this.showCancelAlert();
        this.setState({ selectedItemId: null });
    }
    confirmEvent = () => {
        this.actionSheetRef.current?.setModalVisible(false);
        this.showConfirmationAlert();
        this.setState({ selectedItemId: null });
    }
    renderItem = ({ item }) => {
        return (
            <View
                height={150}
                useNative
                key={item.id}
                width={'100%'}
                style={{
                    elevation: 2,
                    paddingStart: 5,
                    flex: 1,
                    borderWidth: 0,
                    borderColor: COLORS.azulSus,
                    backgroundColor: '#f4f6fc',
                    flexDirection: 'row',
                    borderTopStartRadius: 10,
                    borderBottomStartRadius: 10,
                    borderRadius: 10,
                }}
            >
                <View style={{
                    borderWidth: 0,
                    flex: .8,
                    marginRight: 5,
                    justifyContent: 'space-evenly',
                }}>
                    <Text text60 dark10 style={{ fontWeight: 'bold' }}>
                        {item.name}
                    </Text>
                    <Text text60 dark30>
                        {item.specialty}
                    </Text>
                    <Text text60 dark30 style={{ fontWeight: 'bold' }}>
                        {formatDateAndTime(item.date)}
                    </Text>
                    <Text text60 dark30 lineBreakMode={'tail'} ellipsizeMode={'tail'} numberOfLines={1}>
                        {item.local}
                    </Text>
                </View>
            </View>
        );
    }
    renderFABEmptyArea = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 90,
                }}>
            </View>
        );
    }
    renderItemSeparator = () => {
        return (
            <View
                style={{
                    height: 15,
                }}>
            </View>
        );
    }

    updateFilter = (selected) => {
        this.setState({ selectedFilters: selected, loading: true }, async () => {
            let filter = [];
            if (selected.includes(0)) {
                filter.push('today');
            }
            if (selected.includes(1)) {
                filter.push('tomorrow');
            }
            if (selected.includes(2)) {
                filter.push('this-week');
            }
            const data = await Remote.filterAppointment(filter);
            this.setState({ data, loading: false });
        });
    }

    MySearchBar = () => {
        const buttons = ['Hoje', 'Amanhã', 'Esta semana', 'Próximo mês', 'Personalizado'];
        return (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    height: 60,
                    backgroundColor: 'white',
                }}>
                <ScrollView style={{
                    backgroundColor: 'white',
                    width: '100%',
                }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <ButtonGroup
                        Component={TouchableWithoutFeedback}
                        selectMultiple
                        innerBorderStyle={{ width: 0, }}
                        containerStyle={{ borderWidth: 0, width: '100%', flex: 1, justifyContent: 'space-between' }}
                        onPress={this.updateFilter}
                        buttons={buttons}
                        buttonStyle={{ borderColor: COLORS.azulSus, borderWidth: 1, width: 100, borderRadius: 30, marginRight: 5 }}
                        buttonContainerStyle={{ height: '100%' }}
                        textStyle={{ color: COLORS.azulSus }}
                        selectedButtonStyle={{ backgroundColor: COLORS.azulSus }}
                        selectedIndexes={this.state.selectedFilters}
                        underlayColor={'transparent'}
                    />

                </ScrollView>
            </View>
        );
    }
    addAppointment = () => {
        this.props.navigation.navigate(ROUTES.restricted.addAppointment);
    }
    render() {
        return (
            <View backgroundColor={'white'} style={{ flex: 1, borderWidth: 0, paddingHorizontal: 10 }}>
                {
                    this.state.loading ?
                        <ActivityIndicator color={COLORS.azulSus} size="large" />
                        :
                        <HeaderWithSearch
                            refreshing={this.state.loading}
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id.toString()}
                            ListFooterComponent={this.renderFABEmptyArea}
                            ItemSeparatorComponent={this.renderItemSeparator}
                        >
                            {this.MySearchBar()}
                        </HeaderWithSearch>
                }
                <FAB
                    name='plus'
                    onPress={this.addAppointment}
                />
                <ActionSheet ref={this.actionSheetRef} gestureEnabled indicatorColor={'gray'}>
                    <View backgroundColor={'transparent'} >
                        <Text text60>Você deseja:</Text>
                        <TouchableOpacity onPress={this.confirmEvent}>
                            <View style={{ width: '100%', padding: 10, marginVertical: 5 }}>
                                <Icon name={'check'} size={30} />
                                <Text centerV centerH center text70 style={{ paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 }}>
                                    Confirmar
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.cancelEvent}>
                            <View style={{ width: '100%', padding: 10, marginVertical: 5 }}>
                                <Icon name={'close'} size={30} color={'#FF563D'} />
                                <Text centerV centerH center red30 text70 style={{ paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 }}>
                                    Desmarcar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ActionSheet>
            </View >
        );
    }
}
