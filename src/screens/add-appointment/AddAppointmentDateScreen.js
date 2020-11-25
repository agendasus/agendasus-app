import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator } from 'react-native';
import {
    View,
    Text,
} from 'react-native-ui-lib';

import { COLORS } from '../../constants';

import AppointmentDateListItem from '../../components/AppointmentDateListItem';

import * as Remote from '../../database/Remote';

export default class AddAppointmentDateScreen extends PureComponent {
    static propTypes = {
        goToNext: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            availableDates: [],
            selectedDate: null,
            loading: false,
        };
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
            <AppointmentDateListItem item={item} onPress={this.selectDate} />
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
