import * as React from 'react';
import { FlatList, } from 'react-native';
import {
    View,
    Button,
    Text,
    Card,
    Image,
} from 'react-native-ui-lib';

import { COLORS, ROUTES } from '../constants';

import * as LocalRepository from '../database/Local';

import AuthContext from '../AuthContext';

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
    static contextType = AuthContext;

    signOut = async () => {
        await LocalRepository.deslogar();
        this.context.signOut();
    }

    renderItem = ({ item }) => {
        return (
            <Card flex
                height={100}
                onPress={() => this.props.navigation.navigate(item.route)}
                useNative
                activeOpacity={1}
                activeScale={0.98}
                key={item.id}
                width={'100%'}
                style={{ marginRight: 10, borderColor: COLORS.azulSus, borderWidth: 1 }}
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
            <View flex paddingH-10 paddingV-10 backgroundColor={'white'} style={{ borderWidth: 0 }}>
                <View style={{ borderWidth: 0 }}>
                    <Text text50 color={COLORS.azulSus} style={{ textTransform: 'capitalize', fontWeight: 'bold' }}>
                        {`Olá ${name}`}
                    </Text>
                    <Text text80 color={COLORS.azulSus} >
                        {login}
                    </Text>
                </View>
                <View flex style={{ borderWidth: 0, borderColor: "red" }}>
                    <Image
                        center
                        source={{ uri: 'https://image.freepik.com/free-vector/people-sitting-hospital-corridor-waiting-doctor-patient-clinic-visit-flat-vector-illustration-medicine-healthcare_74855-8507.jpg', }}
                        //TODO melhor colocar essa definição de estilo em um arquivo, nao?
                        style={{
                            height: 250,
                            width: '100%',
                        }}
                        resizeMode={'contain'}
                    />
                    <View style={{ width: '100%', height: '80%', borderWidth: 0 }}>
                        <FlatList
                            numColumns={3}
                            data={DATA}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <View style={{ borderWidth: 0, borderColor: 'green' }}>
                    <Button link linkColor={COLORS.azulSus} label={'SAIR'} onPress={this.signOut} />
                </View>
            </View >
        );
    }
}
