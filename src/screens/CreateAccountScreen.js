import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert, StyleSheet, View, Keyboard } from 'react-native';
import {
    Text,
    Button,
    Input,
} from 'react-native-elements';

import UserPasswordInput from '../components/UserPasswordInput';
import { COLORS, STATUS } from '../constants';

import * as  Remote from '../database/Remote';

const requiredFieldText = 'Este campo é obrigatório';

export default class CreateAccountScreen extends React.Component {

    static propTypes = {
        navigation: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
    }

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
        };

        this.nameField = React.createRef();
        this.passwordField = React.createRef();
        this.emailField = React.createRef();
    }

    checkFillingRequiredFields = () => {
        const { name, email } = this.state;
        let nameError, emailError;

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
            this.setState({ nameError: requiredFieldText });
            return;
        }
        if (!email) {
            this.setState({ nameError: requiredFieldText });
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
        };
        this.setState({ situacao: STATUS.PROGRESS }, sendRegistryRequest);
    }

    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao cadastrar',
            'Não foi possível cadastrar seu usário. Tente novamente em alguns instantes.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

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

    emailFieldFocus = () => this.emailField.current.focus();

    passwordFieldFocus = () => this.passwordField.current.focus();

    onChangeName = name => this.setState({ name });

    onChangeEmail = email => this.setState({ email, emailError: '', generalError: '' });

    onChangePassword = password => this.setState({ password });

    render() {
        const shouldShow = [STATUS.PROGRESS, STATUS.SUCCESS, STATUS.ERROR].includes(this.state.requestStatus);
        return (
            <View style={styles.container} >
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
                        onSubmitEditing={this.emailFieldFocus}
                        blurOnSubmit={false}
                        value={this.state.name}
                        onChangeText={this.onChangeName}
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
                        onSubmitEditing={this.passwordFieldFocus}
                        value={this.state.email}
                        onChangeText={this.onChangeEmail}
                        maxLength={150}
                        leftIcon={{ type: 'material-community', name: 'email', color: COLORS.defaultGray }}
                    />
                    <UserPasswordInput ref={this.passwordField} password={this.state.password} onChangeText={this.onChangePassword} returnKeyType={'done'} blurOnSubmit={false} onSubmitEditing={Keyboard.dismiss} />
                    <Button buttonStyle={styles.loginBtn} title={'Cadastrar'} disabled={shouldShow} onPress={this.startRegistry} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { display: 'flex', paddingHorizontal: 10 },
    loginBtn: { backgroundColor: COLORS.azulSus },
    headerText: { fontSize: 22, paddingBottom: 20 },
});
