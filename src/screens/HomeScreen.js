import * as React from 'react';
import PropTypes from 'prop-types';
import { FlatList, StyleSheet } from 'react-native';
import {
    View,
    Button,
    Text,
    Card,
    Image,
} from 'react-native-ui-lib';

import { COLORS, ROUTES } from '../constants';

import * as LocalRepository from '../database/Local';

import AuthContext from '../contexts/AuthContext';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [
    {
        id: 'appointment',
        title: 'Agendamentos',
        icone: 'calendar',
        route: ROUTES.restricted.appointment,
    },
    {
        id: 'medicalRecord',
        title: 'Prontuários',
        icone: 'note-text',
        route: ROUTES.restricted.medicalRecord,
    },
    {
        id: 'medication',
        title: 'Medicamentos',
        icone: 'pill',
        route: ROUTES.restricted.medication,
    },
];

export default class HomeScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
    }

    static contextType = AuthContext;

    signOut = async () => {
        await LocalRepository.deslogar();
        this.context.signOut();
    }

    renderItem = ({ item }) => {
        return (
            <Card flex
                height={100}
                onPress={() => this.props.navigation.navigate(item.route)} // eslint-disable-line
                useNative
                activeOpacity={1}
                activeScale={0.98}
                key={item.id}
                width={'100%'}
                style={styles.appointmentTypeItem}
                centerV
                centerH
            >
                <View padding-5 centerH>
                    <Icon name={item.icone} size={30} color={COLORS.azulSus} />
                    <Text text80 dark30>
                        {item.title}
                    </Text>
                </View>
            </Card>
        );
    }

    render() {
        const { name, login } = this.props.route.params;
        return (
            <View flex paddingH-20 paddingV-20 backgroundColor={'white'}>
                <View>
                    <Text text50 color={COLORS.azulSus} >
                        {'Olá'}
                    </Text>
                    <Text text50 color={COLORS.azulSus} style={styles.userName}>
                        {name}
                    </Text>
                    <Text text80 color={COLORS.azulSus} >
                        {login}
                    </Text>
                </View>
                <View flex>
                    <Image
                        center
                        source={{ uri: 'https://image.freepik.com/free-vector/people-sitting-hospital-corridor-waiting-doctor-patient-clinic-visit-flat-vector-illustration-medicine-healthcare_74855-8507.jpg', }}
                        //TODO melhor colocar essa definição de estilo em um arquivo, nao?
                        style={styles.img}
                        resizeMode={'contain'}
                    />
                    <View style={styles.list}>
                        <FlatList
                            numColumns={3}
                            data={DATA}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id} // eslint-disable-line
                        />
                    </View>
                </View>
                <View>
                    <Button link linkColor={COLORS.azulSus} label={'SAIR'} onPress={this.signOut} />
                </View>
            </View >
        );
    }
}

const styles = StyleSheet.create({
    appointmentTypeItem: { marginRight: 10, borderColor: COLORS.azulSus, borderWidth: 1 },
    userName: { textTransform: 'capitalize', fontWeight: 'bold' },
    img: { height: 250, width: '100%', },
    list: { width: '100%', height: '80%', borderWidth: 0 },
});
