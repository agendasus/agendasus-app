import * as React from 'react';
import { Alert, TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
    View,
    Button,
    TextField,
    Image,
    Text,
    KeyboardAwareScrollView,
} from 'react-native-ui-lib';
import Dialog from "react-native-dialog";

import Remote from '../database/Remote';
import { ROUTES, COLORS } from '../constants';
import UserPasswordInput from '../components/UserPasswordInput';

import AuthContext from '../AuthContext';

export default class LoginScreen extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: '',
            sendingRequest: false,
            error: false,
            serverAddr: '',
            showServerAddAlert: false,
        };
        this.passwordField = React.createRef();
        this.userField = React.createRef();
        this.inputServerAddr = React.createRef();
    }

    goToForgotPasswordScreen = () => {
        this.props.navigation.navigate(ROUTES.forgotPassword, { user: this.state.user });
    }

    gotToCreateAccountScreen = () => {
        this.props.navigation.navigate(ROUTES.createAccount);
    }

    login = async () => {
        const sendLoginRequest = async () => {
            try {
                const result = await Remote.login(this.state.user, this.state.password);
                if (result) {
                    this.setState({ sendingRequest: false, erro: false });
                    this.context.signIn(result);
                } else {
                    this.showUserOrPasswordErrorAlert();
                    this.setState({ sendingRequest: false, erro: false });
                }
            } catch (e) {
                this.setState({ sendingRequest: false, erro: true });
                this.showGeneralErrorAlert();
            }
        }
        const campoPasswordValido = this.passwordField.current.validar();
        if (!campoPasswordValido) {
            return;
        }
        this.setState({ sendingRequest: true }, sendLoginRequest);
    }

    showUserOrPasswordErrorAlert = () => {
        Alert.alert(
            'Falha ao entrar',
            'Usuário ou password incorretos.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    //TODO de novo????
    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao entrar',
            'Houve um problema ao tentar entrar. Tente novamente em alguns instantes.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    changeServer = () => {
        this.setState({ showServerAddAlert: false });
        Remote.changeServerAddr(this.state.serverAddr);
    }

    mountChangeServerPrompt = () => {
        return (
            <View>
                <Dialog.Container visible={this.state.showServerAddAlert}>
                    <Dialog.Title>Endereço do servidor</Dialog.Title>
                    <Dialog.Description>
                        heroku: agendasus-auth.herokuapp.com
                        local: IP:PORTA
                    </Dialog.Description>
                    <Dialog.Input wrapperStyle={{ borderWidth: 1 }} value={this.state.serverAddr} onChangeText={serverAddr => this.setState({ serverAddr })} placeholder={'Endereço do servidor'} />
                    <Dialog.Button label="OK" onPress={this.changeServer} />
                </Dialog.Container>
            </View>
        );
    }

    render() {
        return (
            <View flex spread paddingH-10 paddingV-10 >
                {this.mountChangeServerPrompt()}
                <Text center uppercase text30 style={{ fontWeight: 'bold' }} color={COLORS.azulSus}>Agenda</Text>
                <View center >
                    <TouchableWithoutFeedback onPress={() => this.setState({ showServerAddAlert: true })}>
                        <Image center source={require('../images/Logo_SUS.svg.png')}
                            //TODO melhor colocar essa definição de estilo em um arquivo, nao?
                            style={{
                                height: 100,
                            }}
                            resizeMode={'contain'}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    getTextInputRefs={() => {
                        return [
                            this.userField,
                            this.passwordField,
                        ];
                    }}
                    contentContainerStyle={{ paddingTop: 20 }}
                >
                    <TextField
                        text50
                        title={'Usuário'}
                        placeholder={'Usuário'}
                        helperText={'Usuário'}
                        titleColor={COLORS.azulSus}
                        floatingPlaceholder={true}
                        floatingPlaceholderColor={COLORS.azulSus}
                        value={this.state.user}
                        onChangeText={user => this.setState({ user })}
                        maxLength={150}
                        returnKeyType={'next'}
                        ref={this.userField}
                        onSubmitEditing={() => { this.passwordField.current.focus() }}
                        blurOnSubmit={false}
                    />
                    <UserPasswordInput ref={this.passwordField} onChangeText={password => this.setState({ password })} password={this.state.password} />
                    <View flex right marginB-20>
                        <Button disabled={this.state.sendingRequest} link linkColor={COLORS.azulSus} backgroundColor={COLORS.azulSus} label={'Esqueci minha senha'} onPress={this.goToForgotPasswordScreen} />
                    </View>
                    <View flex spread marginB-20>
                        <Button br20 disabled={this.state.sendingRequest} backgroundColor={COLORS.azulSus} label={'Entrar'} onPress={this.login} />
                    </View>

                    <View flex row center>
                        <Text center text70 color={this.state.sendingRequest ? COLORS.cinzaDesabilitado : 'black'}> Ainda não tem acesso? </Text>
                        <Button disabled={this.state.sendingRequest} link linkColor={COLORS.azulSus} label={'Criar conta.'} onPress={this.gotToCreateAccountScreen} />
                    </View>
                </KeyboardAwareScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
