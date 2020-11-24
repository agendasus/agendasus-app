import React, { PureComponent } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
    Text,
    View,
    Card,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants';

import * as Remote from '../../database/Remote';

export default class AddAppointmentTypeScreen extends PureComponent {
    state = {
        appointmentTypes: [],
        selectedIndex: null,
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

    render() {
        return (
            <>
                <Text text50 color={COLORS.azulSus}>
                    Qual tipo de agendamento você precisa?
                </Text>
                <View marginT-10 center >
                    {
                        this.state.appointmentTypes.map((item, index) => (
                            <Card key={index} center marginV-10 style={{ elevation: 10, width: 150, height: 150 }}
                                onPress={() => this.props.goToNext(item)}
                            >
                                <Icon name={item.icon} size={30} color={COLORS.azulSus} />
                                <Text>{item.name}</Text>
                            </Card>
                        ))
                    }
                </View>
            </>
        );
    }
}
