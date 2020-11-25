import React, { PureComponent } from 'react';
import { ActivityIndicator, } from 'react-native';
import {
    Text,
    View,
} from 'react-native-ui-lib';
import PropTypes from 'prop-types';

import AppointmentTypeListItem from '../../components/AppointmentTypeListItem';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

export default class AddAppointmentTypeScreen extends PureComponent {

    static propTypes = {
        item: PropTypes.object.isRequired,
        goToNext: PropTypes.func.isRequired,
    };

    state = {
        appointmentTypes: [],
        selectedIndex: null,
        loading: true,
    }

    async componentDidMount() {
        const appointmentTypes = await Remote.getAppointmentTypes();
        this.setState({ appointmentTypes });
    }

    selectType = selectedIndex => {
        this.setState({
            selectedIndex,
        });
    }


    goToNext = item => {
        this.props.goToNext(item);
    }

    render() {
        return (
            <>
                <Text text50 color={COLORS.azulSus}>
                    {'Qual tipo de agendamento você precisa?'}
                </Text>
                <View marginT-10 center >
                    {
                        this.state.loading ? <ActivityIndicator color={COLORS.azulSus} size='large' />
                            :
                            this.state.appointmentTypes.map(item => (
                                <AppointmentTypeListItem key={item.id} item={item} />
                            ))
                    }
                </View>
            </>
        );
    }
}
