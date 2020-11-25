import React, { PureComponent } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import {
    Text,
    View,
} from 'react-native-ui-lib';
import {
    Icon
} from 'react-native-elements';

import { COLORS } from '../../constants';

import { formatDateAndTime } from '../../utility/util';

import * as Remote from '../../database/Remote';

export default class AddAppointmentSummaryScreen extends PureComponent {

    render() {
        this.props = {
            data: {
                typeData: { name: "Consulta" },
                localData: { name: "Clínica São Lucas" },
                dateData: { date: Date.now() },
            }
        }
        return (
            <View flex>
                <Text text50 color={COLORS.azulSus}>
                    {'Verifique os dados do seu agendamento e se estiver tudo certo, confirme o agendamento.'}
                </Text>
                <View height={130} style={{ borderWidth: 0 }}>
                    <View flex left padding-10 backgroundColor={'#E8E8E8'} style={{ borderRadius: 10 }}>
                        <View paddingB-10 row left>
                            <Icon type={'material-community'} name={'clipboard-plus-outline'} />
                            <Text marginL-10 text50>{this.props.data.typeData?.name}</Text>
                        </View>
                        <View paddingB-10 row left>
                            <Icon type={'material-community'} name={'hospital-marker'} />
                            <Text marginL-10 text50>{this.props.data.localData?.name}</Text>
                        </View>
                        <View paddingB-10 row left>
                            <Icon type={'material-community'} name={'calendar'} />
                            <Text marginL-10 text50>{formatDateAndTime(this.props.data.dateData?.date)}</Text>
                        </View>
                    </View>
                </View>
                <Text text60 top flex-1 color={COLORS.defaultGray}>
                    {'Lembre de chegar sempre com alguns minutos de antecedência.'}
                </Text>
            </View>
        );
    }
}
