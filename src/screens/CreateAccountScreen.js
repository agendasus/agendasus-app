import * as React from 'react';
import { Alert, ActivityIndicator, Keyboard } from "react-native";
import {
    Text,
    View,
    Button,
    TextField,
    KeyboardAwareScrollView,
} from 'react-native-ui-lib';

import UserPasswordInput from '../components/UserPasswordInput';
import { COLORS, STATUS } from '../constants';

import Remote from '../database/Remote';

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
        const hasRequiredFieldsUnfilled = this.checkFillingRequiredFields();
        const hasValidPassword = this.passwordField.current.validar();
        if (hasRequiredFieldsUnfilled || !hasValidPassword) {
            this.setState({
                ...hasRequiredFieldsUnfilled,
            });
            return;
        }
        const sendRegistryRequest = async () => {
            try {
                const { name, email, password } = this.state;
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
        const shouldShow = [STATUS.PROGRESS, STATUS.SUCCESS, STATUS.ERROR].includes(this.state.requeststatus);
        return (
            <View flex spread paddingH-10 paddingV-10 >
                <Text text60 marginB-10>Para liberar seu acesso, precisamos que nos informe alguns dados sobre você.</Text>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    getTextInputRefs={() => {
                        return [
                            this.name,
                            this.email,
                            this.passwordField,
                        ];
                    }}
                >
                    <TextField
                        returnKeyType={'next'}
                        ref={r => {
                            this.name = r;
                        }}
                        enableErrors
                        error={this.state.nameError}
                        text50
                        title={'Nome completo'}
                        placeholder={'Nome completo'}
                        helperText={'Nome completo'}
                        titleColor={COLORS.azulSus}
                        floatingPlaceholder={true}
                        floatingPlaceholderColor={COLORS.azulSus}
                        onSubmitEditing={() => { this.emailField.current.focus() }}
                        blurOnSubmit={false}
                        value={this.state.name}
                        onChangeText={name => this.setState({ name })}
                        maxLength={250}
                    />
                    <TextField
                        returnKeyType={'next'}
                        ref={this.emailField}
                        error={this.state.emailError}
                        text50
                        title={'E-mail'}
                        placeholder={'E-mail'}
                        helperText={'E-mail'}
                        titleColor={COLORS.azulSus}
                        floatingPlaceholder={true}
                        floatingPlaceholderColor={COLORS.azulSus}
                        keyboardType={'email-address'}
                        blurOnSubmit={false}
                        onSubmitEditing={() => { this.passwordField.current.focus(); }}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email, emailError: '', generalError: '' })}
                        maxLength={150}
                    />
                    <UserPasswordInput ref={this.passwordField} password={this.state.password} onChangeText={password => this.setState({ password })} returnKeyType={'done'} blurOnSubmit={false} onSubmitEditing={Keyboard.dismiss} />
                    <Button
                        br20
                        disabled={this.state.requeststatus === STATUS.PROGRESS}
                        marginT-10
                        backgroundColor={COLORS.azulSus}
                        label={'Cadastrar'}
                        onPress={this.startRegistry}
                    >
                        <View >
                            <ActivityIndicator style={{ marginHorizontal: 0 }} size="small" color={COLORS.azulSus} />
                        </View>
                    </Button>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}
