import * as React from 'react';
import { Alert, Image, View, TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
    Button,
    Input,
    Text,
} from 'react-native-elements';

import Dialog from "react-native-dialog";

import * as  Remote from '../database/Remote';
import { ROUTES, COLORS } from '../constants';
import UserPasswordInput from '../components/UserPasswordInput';

import AuthContext from '../contexts/AuthContext';

export default class LoginScreen extends React.Component {
    static contextType = AuthContext;
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            userError: '',
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
        const userError = this.state.user ? '' : 'Campo obrigatório';
        if (userError) {
            this.setState({ userError });
            return;
        }
        const campoPasswordValido = this.passwordField.current.validate();
        if (!campoPasswordValido) {
            return;
        }
        this.setState({ sendingRequest: true }, sendLoginRequest);
    }

    showUserOrPasswordErrorAlert = () => {
        Alert.alert(
            'Falha ao entrar',
            'Usuário ou senha incorretos.',
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
        const textLinkColor = this.state.sendingRequest ? COLORS.cinzaDesabilitado : COLORS.azulSus;
        return (
            <View style={{ display: 'flex', paddingHorizontal: 10 }} >
                {this.mountChangeServerPrompt()}
                <View style={{ display: 'flex', alignItems: 'center' }}  >
                    <Text style={{ fontWeight: 'bold', fontSize: 40, color: COLORS.azulSus }} > Agenda</Text>
                    <TouchableWithoutFeedback onPress={() => this.setState({ showServerAddAlert: true })}>
                        <Image
                            source={require('../../assets/Logo_SUS.png')}
                            //TODO melhor colocar essa definição de estilo em um arquivo, nao?
                            style={{ width: 200, height: 100 }}
                            resizeMode={'contain'}
                        />
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    <Input
                        text50
                        label={'Usuário'}
                        placeholder={'joao@email.com'}
                        leftIcon={{ type: 'material-community', name: 'email', color: COLORS.defaultGray }}
                        value={this.state.user}
                        onChangeText={user => this.setState({ user, userError: '' })}
                        maxLength={150}
                        returnKeyType={'next'}
                        ref={this.userField}
                        onSubmitEditing={() => { this.passwordField.current.focus() }}
                        blurOnSubmit={false}
                        errorMessage={this.state.userError}
                    />
                    <UserPasswordInput ref={this.passwordField} onChangeText={password => this.setState({ password })} password={this.state.password} />
                    <TouchableWithoutFeedback onPress={this.goToForgotPasswordScreen}>
                        <Text style={[styles.forgotPassword, styles.linkText, { color: textLinkColor }]} >Esqueci minha senha</Text>
                    </TouchableWithoutFeedback>
                    <Button buttonStyle={styles.loginBtn} title='Entrar' disabled={this.state.sendingRequest} onPress={this.login} />
                    <View style={styles.createAccount}>
                        <Text style={styles.createAccountText}>
                            <Text> Ainda não tem acesso? </Text>
                            <TouchableWithoutFeedback onPress={this.gotToCreateAccountScreen}>
                                <Text style={[styles.linkText, { color: textLinkColor }]} >Crie uma conta</Text>
                            </TouchableWithoutFeedback>
                        </Text>
                    </View>
                </View>
            </View >
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
    loginBtn: { backgroundColor: COLORS.azulSus },
    forgotPassword: { display: 'flex', alignSelf: 'flex-end' },
    createAccount: { display: 'flex', flexDirection: 'row', alignSelf: 'flex-end' },
    createAccountText: { fontSize: 18, paddingVertical: 20 },
    linkText: { fontSize: 18, paddingBottom: 20 },
});