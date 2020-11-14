import * as React from 'react';
import {
    View,
    Button,
    Text,
} from 'react-native-ui-lib';

import { CORES } from '../constants';

import * as LocalRepository from '../database/Local';

import AuthContext from '../AuthContext';

export default class HomeScreen extends React.Component {
    static contextType = AuthContext;

    signOut = async () => {
        await LocalRepository.deslogar();
        this.context.signOut();
    }

    render() {
        return (
            <View flex paddingH-25 paddingT-120 >
                <Text>Entrouuuu</Text>
                {
                    this.props.route.params && Object.values(this.props.route.params).map(dado => (
                        <Text key={dado}>{dado}</Text>
                    ))
                }
                <Button backgroundColor={CORES.azulSus} label={'SAIR'} onPress={this.signOut} />
            </View >
        );
    }
}
