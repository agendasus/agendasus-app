import * as React from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import {
    View,
} from 'react-native-ui-lib';
import {
    Button,
    Icon,
} from 'react-native-elements';
import Swiper from 'react-native-swiper';

import AddAppointmentTypeScreen from './AddAppointmentTypeScreen';
import AddAppointmentLocalScreen from './AddAppointmentLocalScreen';
import AddAppointmentDateScreen from './AddAppointmentDateScreen';
import AddAppointmentSummaryScreen from './AddAppointmentSummaryScreen';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

export default class AddAppointmentScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            pageIndex: 0,
            localData: null,
            typeData: null,
            dateData: null,
            currentIndex: 0,
            sending: false,
        };
        this.swiperField = React.createRef();
    }

    goToNext = () => {
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

    goBack = () => {
        this.swiperField.current.scrollBy(-1);
    }

    setCurrentIndex = currentIndex => {
        this.setState({ currentIndex });
    }

    sendAppointmentRequest = () => {
        this.setState({ sending: true }, async () => {
            const result = await Remote.sendAppointmentRequest();
            if (result) {
                alert('Seu agendamento foi realizado.');
                this.props.navigation.goBack();
                return;
            }
            alert('Não foi possível realizar seu agendamento. Tente novamente.');
            this.setState({ sending: false });
        });
    }

    mountFooter = () => {
        if (this.state.currentIndex === 3) {
            return (
                <View center style={styles.footerContainer}>
                    <View absL left>
                        <Icon
                            onPress={this.goBack}
                            raised
                            reverse
                            reverseColor={'white'}
                            color={COLORS.azulSus}
                            type={'material-community'}
                            name={'arrow-left-thick'}
                            disabled={this.state.sending} />
                    </View>
                    <View flex-2 center>
                        <Button disabled={this.state.sending} buttonStyle={styles.confirmBtn} title={'Confirmar'} onPress={this.sendAppointmentRequest} />
                    </View>
                </View>
            );
        }
        return (
            <View center style={styles.backBtn}>
                <Icon
                    onPress={this.goBack}
                    raised
                    reverse
                    reverseColor={'white'}
                    color={COLORS.azulSus}
                    type={'material-community'}
                    name={'arrow-left-thick'}
                />
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

const styles = StyleSheet.create({
    footerContainer: { borderWidth: 0, height: '10%' },
    confirmBtn: { backgroundColor: COLORS.azulSus, width: 200 },
    backBtn: { borderWidth: 0, height: '10%', alignSelf: 'flex-start' },
});
