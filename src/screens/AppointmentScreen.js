import * as React from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, ScrollView, View, Alert, TouchableWithoutFeedback, TouchableOpacity, StyleSheet } from 'react-native';
import {
    Text,
} from 'react-native-ui-lib';
import {
    ButtonGroup,
} from 'react-native-elements';
import ActionSheet from 'react-native-actions-sheet';
import { Icon } from 'react-native-elements';

import FAB from '../components/FAB';
import { COLORS, ROUTES } from '../constants';

import { formatDateAndTime } from '../utility/util';

import HeaderWithSearch from '../components/HeaderWithSearch';

import * as Remote from '../database/Remote';

export default class AppointmentScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            showOptions: false,
            selectedItemId: null,
            selectedFilters: [],
        };
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

    showOptions = (itemId) => {
        this.setState({ showOptions: true, selectedItemId: itemId });
        this.actionSheetRef.current?.setModalVisible();
    }
    showConfirmationAlert = () => {
        Alert.alert(
            'Presença confirmada',
            'Legal, sua presença está confirmada.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }
    showCancelAlert = () => {
        Alert.alert(
            'Presença cancelada',
            'Que pena, sua presença foi cancelada.',
            [
                { text: 'OK' }
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
                style={styles.appointmentItem}
            >
                <View style={styles.appointmentItemContent}>
                    <Text text60 dark10 style={styles.fontBold}>
                        {item.name}
                    </Text>
                    <Text text60 dark30>
                        {item.specialty}
                    </Text>
                    <Text text60 dark30 style={styles.fontBold}>
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
                style={styles.fabEmpty}>
            </View>
        );
    }
    renderItemSeparator = () => {
        return (
            <View
                style={styles.listItemSeparator}>
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

    mountSearchBar = () => {
        const buttons = ['Hoje', 'Amanhã', 'Esta semana', 'Próximo mês', 'Personalizado'];
        return (
            <View
                style={styles.searchBarContainer}>
                <ScrollView style={styles.searchBarContent}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                >
                    <ButtonGroup
                        Component={TouchableWithoutFeedback}
                        selectMultiple
                        innerBorderStyle={styles.filterInnerBorderStyle}
                        containerStyle={styles.filterContainerStyle}
                        onPress={this.updateFilter}
                        buttons={buttons}
                        buttonStyle={styles.filterButtonStyle}
                        buttonContainerStyle={styles.filterButtonContainerStyle}
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
    keyExtractor = item => item.id.toString();
    render() {
        return (
            <View backgroundColor={'white'} style={styles.container}>
                {
                    this.state.loading ?
                        <ActivityIndicator color={COLORS.azulSus} size='large' />
                        :
                        <HeaderWithSearch
                            refreshing={this.state.loading}
                            data={this.state.data}
                            renderItem={this.renderItem}
                            keyExtractor={this.keyExtractor}
                            ListFooterComponent={this.renderFABEmptyArea}
                            ItemSeparatorComponent={this.renderItemSeparator}
                        >
                            {this.mountSearchBar()}
                        </HeaderWithSearch>
                }
                <FAB
                    name={'plus'}
                    onPress={this.addAppointment}
                />
                <ActionSheet ref={this.actionSheetRef} gestureEnabled indicatorColor={'gray'}>
                    <View backgroundColor={'transparent'} >
                        <Text text60>{'Você deseja:'}</Text>
                        <TouchableOpacity onPress={this.confirmEvent}>
                            <View style={styles.confirmOption}>
                                <Icon name={'check'} size={30} />
                                <Text centerV centerH center text70 style={styles.confirmOptionText}>
                                    {'Confirmar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.cancelEvent}>
                            <View style={styles.cancelOption}>
                                <Icon name={'close'} size={30} color={'#FF563D'} />
                                <Text centerV centerH center red30 text70 style={styles.cancelOptionText}>
                                    {'Desmarcar'}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ActionSheet>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    appointmentItem: {
        elevation: 2,
        paddingStart: 5,
        flex: 1,
        borderWidth: 0,
        borderColor: COLORS.azulSus,
        backgroundColor: COLORS.lightGray,
        flexDirection: 'row',
        borderTopStartRadius: 10,
        borderBottomStartRadius: 10,
        borderRadius: 10,
    },
    appointmentItemContent: {
        borderWidth: 0,
        flex: .8,
        marginRight: 5,
        justifyContent: 'space-evenly',
    },
    fontBold: { fontWeight: 'bold' },
    fabEmpty: {
        flexDirection: 'row',
        height: 90,
    },
    listItemSeparator: {
        height: 15,
    },
    searchBarContainer: {
        flex: 1,
        width: '100%',
        height: 60,
        backgroundColor: COLORS.white,
    },
    searchBarContent: {
        backgroundColor: COLORS.white,
        width: '100%',
    },
    filterInnerBorderStyle: { width: 0, },
    filterContainerStyle: { borderWidth: 0, width: '100%', flex: 1, justifyContent: 'space-between' },
    filterButtonStyle: { borderColor: COLORS.azulSus, borderWidth: 1, width: 100, borderRadius: 30, marginRight: 5 },
    filterButtonContainerStyle: { height: '100%' },
    container: { flex: 1, borderWidth: 0, paddingHorizontal: 10 },
    confirmOption: { width: '100%', padding: 10, marginVertical: 5 },
    confirmOptionText: { paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 },
    cancelOption: { width: '100%', padding: 10, marginVertical: 5 },
    cancelOptionText: { paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 },
});
