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

import { COLORS } from '../../constants';

export default class AddAppointmentScreen extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            pageIndex: 0,
            typeData: null,
            dateData: null,

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
        console.log('data', typeData);
        this.setState({ typeData })
        this.swiperField.current.scrollBy(1);
    }

    gotToDateScreen = dateData => {
        console.log('data', dateData);
        this.setState({ dateData })
        this.swiperField.current.scrollBy(1);
    }

    gotBack = () => {
        this.swiperField.current.scrollBy(-1);
    }


    render() {
        return (
            <View flex marginV-20 marginH-20>
                <Swiper ref={this.swiperField} loop={false} showsButtons={false} showsPagination={false} scrollEnabled={false}
                    keyboardShouldPersistTaps={'always'}
                >
                    <AddAppointmentTypeScreen goToNext={this.goToLocalScreen} />
                    <AddAppointmentLocalScreen goToNext={this.gotToDateScreen} data={this.state.typeData} />
                    <AddAppointmentDateScreen goToNext={this.goToLocalScreen} data={this.state.dateData} />
                </Swiper>
                <View>
                    <Icon
                        onPress={this.gotBack}
                        raised
                        reverse
                        reverseColor={'white'}
                        color={COLORS.azulSus}
                        type={'material-community'}
                        name='arrow-left-thick' />
                </View>
            </View>
        );
    }
}
