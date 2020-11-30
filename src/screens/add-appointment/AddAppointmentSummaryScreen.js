import React, { PureComponent } from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
import {
  Text,
  View,
} from 'react-native-ui-lib';
import {
  Icon,
} from 'react-native-elements';

import { COLORS } from '../../constants';

import { formatDateAndTime } from '../../utility/util';

const windowWidth = Dimensions.get('window').width;

export default class AddAppointmentSummaryScreen extends PureComponent {
  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  static defaultProps = {
    // data: {
    //   typeData: {},
    //   localData: {},
    //   dateData: {},
    // },
    //Apenas para testes
    data: {
      typeData: { name: 'Consulta' },
      localData: { name: 'Clínica São Lucas' },
      dateData: { date: Date.now() },
    },
  };


  render() {
    return (
      <View flex>
        <Text text50 color={COLORS.azulSus}>
          Verifique os dados do seu agendamento e se estiver tudo certo, pode confirmar!
        </Text>
        <View>
          <ScrollView backgroundColor="#E8E8E8" style={styles.content}>
            <View paddingV-10 row left>
              <Icon type="material-community" name="clipboard-plus-outline" />
              <Text marginL-10 text50>{this.props.data.typeData?.name}</Text>
            </View>
            <View paddingB-10 row left width={windowWidth - 105} >
              <Icon type="material-community" name="hospital-marker" />
              <Text marginL-10 text50 ellipsizeMode={'tail'} textBreakStrategy={'balanced'} numberOfLines={3}>{this.props.data.localData?.name}</Text>
            </View>
            <View paddingB-10 row left>
              <Icon type="material-community" name="calendar" />
              <Text marginL-10 text50>{formatDateAndTime(this.props.data.dateData?.date)}</Text>
            </View>
          </ScrollView>
        </View>
        <Text text60 top flex-1 color={COLORS.defaultGray}>
          Lembre de chegar sempre com alguns minutos de antecedência.
        </Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  content: { padding: 10, borderRadius: 10 },
});