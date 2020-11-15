import * as React from 'react';
import { Alert, FlatList, StyleSheet, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import {
    View,
    Text,
    Card,
    Button,
} from 'react-native-ui-lib';
import ActionSheet from "react-native-actions-sheet";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FAB from '../components/FAB';
import { COLORS } from '../constants';

import { formatDateAndTime } from '../util';
const styles = StyleSheet.create({
    actionButtonIcon: {
        fontSize: 20,
        height: 22,
        color: 'white',
    },
});
const DATA = [
    {
        id: '1',
        local: 'Hospital XYZ - Rua inventada',
        specialty: 'Clinico geral',
        name: 'Milton Nascimento',
        date: Date.now(),
    },
    {
        id: '2',
        local: 'Hospital Bahia Sul - Rua desconhecida',
        specialty: 'Cardiologista',
        name: 'Chorão do Charlie Brown',
        date: Date.now() + (86400000 * 3),
    },
    {
        id: '3',
        local: 'Hospital leste oeste - Rua XV de Novembro',
        specialty: 'Urologista',
        name: 'Dinho Ouro Preto',
        date: Date.now() + (86400000 * 5),
    },
    {
        id: '4',
        local: 'Posto de saúde da Barra - Rua da barra',
        specialty: 'Nutricionista',
        name: 'Maria Gadú',
        date: Date.now() + (86400000 * 5),
    },
]

export default class AppointmentScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            showOptions: false,
            selectedItemId: null,
        }
        this.actionSheetRef = React.createRef();
    }

    async componentDidMount() {

        await this.loadData();
        this.focusListener = this.props.navigation.addListener('didFocus', async () => {
            await this.loadData();
        });
    }
    async loadData() {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, data: DATA });
        }, 0);
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
            <Card
                height={150}
                useNative
                key={item.id}
                width={'100%'}
                style={{ padding: 5, borderColor: COLORS.azulSus, borderWidth: 0, backgroundColor: '#f6f9ff' }}
            >
                <TouchableWithoutFeedback
                    onPress={() => this.showOptions(item.id)}
                >
                    <View flex left spread padding-5>
                        <Text text60 dark30 style={{ fontWeight: 'bold' }}>
                            {item.name}
                        </Text>
                        <Text text60 dark30>
                            {item.specialty}
                        </Text>
                        <Text text60 dark30 green10 style={{ fontWeight: 'bold', color: '#7cb6b1' }}>
                            {formatDateAndTime(item.date)}
                        </Text>
                        <Text text60 dark30 lineBreakMode={'tail'} ellipsizeMode={'tail'} numberOfLines={1}>
                            {item.local}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </Card>
        );
    }
    renderFABEmptyArea = () => {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    height: 15,
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
    render() {
        return (
            <View flex paddingH-10 backgroundColor={'white'} style={{ borderWidth: 0 }}>
                <Text text50 marginB-10 style={{ color: COLORS.azulSus, fontWeight: 'bold' }}>
                    Agendamentos
                </Text>
                <FlatList
                    numColumns={1}
                    data={this.state.data}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    onRefresh={this.loadData}
                    refreshing={this.state.loading}
                    ListFooterComponent={this.renderFABEmptyArea}
                    ItemSeparatorComponent={this.renderItemSeparator}
                />

                <FAB
                    name='plus'
                    onPress={() => alert("criar novo agendamento vai aqui")}
                />

                <ActionSheet ref={this.actionSheetRef} gestureEnabled indicatorColor={'gray'}>
                    <View flex paddingH-10 paddingV-10 backgroundColor={'transparent'} >
                        <Text text60>Você deseja:</Text>
                        <TouchableOpacity onPress={this.confirmEvent}>
                            <View flex row left style={{ width: '100%', padding: 10, marginVertical: 5 }}>
                                <Icon name={'check'} size={30} />
                                <Text centerV centerH center text70 style={{ paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 }}>
                                    Confirmar
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.cancelEvent}>
                            <View flex row left style={{ width: '100%', padding: 10, marginVertical: 5 }}>
                                <Icon name={'close'} size={30} color={'#FF563D'} />
                                <Text centerV centerH center red30 text70 style={{ paddingLeft: 10, textAlign: 'center', textAlignVertical: 'center', paddingBottom: 1 }}>
                                    Desmarcar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ActionSheet>
            </View>
        );
    }
}
