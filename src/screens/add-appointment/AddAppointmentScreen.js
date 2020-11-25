import * as React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import {
    View,
    Text,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
    Icon,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';

import AddAppointmentTypeScreen from './AddAppointmentTypeScreen';
import AddAppointmentLocalScreen from './AddAppointmentLocalScreen';
import AddAppointmentDateScreen from './AddAppointmentDateScreen';
import AddAppointmentSummaryScreen from './AddAppointmentSummaryScreen';

import { COLORS } from '../../constants';

export default class AddAppointmentScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0,
            localData: null,
            typeData: null,
            dateData: null,
            currentIndex: 0,
        };
        this.swiperField = React.createRef();
    }

    goToNext = (data) => {
        let nextIndex = 0;
        const currentPageIndex = this.state.pageIndex;
        if (currentPageIndex === 0) {
            this.swiperField.current.scrollBy(1);
            nextIndex = 1;
        } else if (currentPageIndex === 1) {
            nextIndex = 2;
            this.swiperField.current.scrollBy(1);
        }
        this.setState({ pageIndex: nextIndex });
    }

    goToLocalScreen = typeData => {
        this.setState({ typeData });
        this.swiperField.current.scrollBy(1);
    }

    gotToDateScreen = localData => {
        this.setState({ localData });
        this.swiperField.current.scrollBy(1);
    }

    gotToSummaryScreen = (dateData) => {
        this.setState({ dateData });
        this.swiperField.current.scrollBy(1);
    }

    gotBack = () => {
        this.swiperField.current.scrollBy(-1);
    }

    setCurrentIndex = currentIndex => {
        this.setState({ currentIndex })
    }

    sendAppointmentRequest = () => {
        alert('Seu agendamento foi realizado.');
        this.props.navigation.goBack();
    }

    mountFooter = () => {
        if (this.state.currentIndex === 3) {
            return (
                <View center style={{ borderWidth: 0, height: '10%' }}>
                    <View absL left style={{ borderWidth: 0, }}>
                        <Icon
                            onPress={this.gotBack}
                            raised
                            reverse
                            reverseColor={'white'}
                            color={COLORS.azulSus}
                            type={'material-community'}
                            name='arrow-left-thick' />
                    </View>
                    <View flex-2 center>
                        <Button buttonStyle={{ backgroundColor: COLORS.azulSus, width: 200 }} title='Confirmar' onPress={this.sendAppointmentRequest} />
                    </View>
                </View>
            );
        }
        return (
            <View center style={{ borderWidth: 0, height: '10%', alignSelf: 'flex-start' }}>
                <Icon
                    onPress={this.gotBack}
                    raised
                    reverse
                    reverseColor={'white'}
                    color={COLORS.azulSus}
                    type={'material-community'}
                    name='arrow-left-thick' />
            </View>
        );
    }

    render() {
        return (
            <View flex marginV-20 marginH-20>
                <Swiper index={0} ref={this.swiperField} loop={false} showsButtons={false} showsPagination={false} scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}
                    loadMinimal={true}
                    onIndexChanged={this.setCurrentIndex}
                >
                    <AddAppointmentTypeScreen goToNext={this.goToLocalScreen} />
                    <AddAppointmentLocalScreen goToNext={this.gotToDateScreen} data={this.state.typeData} />
                    <AddAppointmentDateScreen goToNext={this.gotToSummaryScreen} data={this.state.dateData} />
                    <AddAppointmentSummaryScreen data={{ typeData: this.state.typeData, dateData: this.state.dateData, localData: this.state.localData }} />
                </Swiper>
                {this.mountFooter()}
            </View>
        );
    }
}
