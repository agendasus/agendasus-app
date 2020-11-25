import * as React from 'react';
import { Alert, StyleSheet, View, Keyboard } from 'react-native';
import {
    Text,
    Button,
    Input,
} from 'react-native-elements';

import UserPasswordInput from '../components/UserPasswordInput';
import { COLORS, STATUS } from '../constants';

import * as  Remote from '../database/Remote';

export default class CreateAccountScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            password: '',
            nameError: '',
            emailError: '',
            passwordError: '',
            requestStatus: null,
            generalError: '',
        }

        this.nameField = React.createRef();
        this.passwordField = React.createRef();
        this.emailField = React.createRef();
    }

    checkFillingRequiredFields = () => {
        const { name, email } = this.state;
        let nameError, emailError;
        const requiredFieldText = 'Este campo é obrigatório';
        if (!name) {
            nameError = requiredFieldText;
        }
        if (!email) {
            emailError = requiredFieldText;
        }

        const hasRequiredFieldsUnfilled = nameError || emailError;

        return hasRequiredFieldsUnfilled ? { nameError, emailError } : null;
    }

    startRegistry = () => {
        const { name, email, password } = this.state;
        if (!name) {
            this.setState({ nameError: 'Este campo é obrigatório' });
            return;
        }
        if (!email) {
            this.setState({ nameError: 'Este campo é obrigatório' });
            return;
        }
        const hasRequiredFieldsUnfilled = this.checkFillingRequiredFields();
        const hasValidPassword = this.passwordField.current.validate();
        if (hasRequiredFieldsUnfilled || !hasValidPassword) {
            this.setState({
                ...hasRequiredFieldsUnfilled,
            });
            return;
        }
        const sendRegistryRequest = async () => {
            try {
                const resultado = await Remote.register({ name, email, password });
                if (!resultado || resultado.error) {
                    const generalError = resultado.error;
                    if (generalError === 'checkExists') {
                        this.setState({ situacao: STATUS.ERROR, erroGeral: generalError, emailError: 'E-mail está em uso.' });
                    }
                    return;
                }
                this.setState({ situacao: STATUS.SUCCESS });
                this.showSuccessAlert();
            }
            catch (e) {
                this.setState({ situacao: STATUS.ERROR });
            }
        }
        this.setState({ situacao: STATUS.PROGRESS }, sendRegistryRequest);
    }

    //TODO de novo? acho bom centralizar e reaproveitar
    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao cadastrar',
            'Não foi possível cadastrar seu usário. Tente novamente em alguns instantes.',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') }
            ],
            { cancelable: false }
        );
    }

    //TODO de novo? acho bom centralizar e reaproveitar
    showSuccessAlert = () => {
        Alert.alert(
            'Sucesso ao cadastrar',
            'Seu usuário foi cadastrado com sucesso.',
            [
                { text: 'OK', onPress: () => this.props.navigation.goBack() }
            ],
            { cancelable: false }
        );
    }

    render() {
        const shouldShow = [STATUS.PROGRESS, STATUS.SUCCESS, STATUS.ERROR].includes(this.state.requestStatus);
        return (
            <View style={{ display: 'flex', paddingHorizontal: 10 }} >
                <Text style={styles.headerText}>{'Para liberar seu acesso, precisamos que nos informe alguns dados sobre você.'}</Text>
                <View
                >
                    <Input
                        ref={this.nameField}
                        returnKeyType={'next'}
                        enableErrors
                        errorMessage={this.state.nameError}
                        label={'Nome completo'}
                        placeholder={'Nome completo'}
                        onSubmitEditing={() => { this.emailField.current.focus() }}
                        blurOnSubmit={false}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        maxLength={250}
                        leftIcon={{ type: 'material-community', name: 'account', color: COLORS.defaultGray }}
                    />
                    <Input
                        returnKeyType={'next'}
                        ref={this.emailField}
                        errorMessage={this.state.emailError}
                        label={'E-mail'}
                        placeholder={'E-mail'}
                        keyboardType={'email-address'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => { this.passwordField.current.focus(); }}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email, emailError: '', generalError: '' })}
                        maxLength={150}
                        leftIcon={{ type: 'material-community', name: 'email', color: COLORS.defaultGray }}
                    />
                    <UserPasswordInput ref={this.passwordField} password={this.state.password} onChangeText={password => this.setState({ password })} returnKeyType={'done'} blurOnSubmit={false} onSubmitEditing={Keyboard.dismiss} />
                    <Button buttonStyle={styles.loginBtn} title={'Cadastrar'} disabled={shouldShow} onPress={this.startRegistry} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    loginBtn: { backgroundColor: COLORS.azulSus },
    forgotPassword: { display: 'flex', alignSelf: 'flex-end' },
    createAccount: { display: 'flex', flexDirection: 'row', alignSelf: 'flex-end' },
    createAccountText: { fontSize: 18, paddingVertical: 20 },
    headerText: { fontSize: 22, paddingBottom: 20 },
});
