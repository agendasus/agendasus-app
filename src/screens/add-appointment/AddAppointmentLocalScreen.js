import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { FlatList, ActivityIndicator } from 'react-native';
import {
    View,
    Text,
} from 'react-native-ui-lib';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

import SearchBar from '../../components/SearchBar';
import AppointmentLocalListItem from '../../components/AppointmentLocalListItem';

export default class AddAppointmentLocalScreen extends PureComponent {

    static propTypes = {
        goToNext: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            appointmentLocal: [],
            showappointmentLocal: false,
            selectedLocal: null,
            loading: false,
        };
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
            <AppointmentLocalListItem item={item} onPress={this.selectLocal} />

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
