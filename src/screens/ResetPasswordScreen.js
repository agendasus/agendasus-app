import * as React from 'react';
import PropTypes from 'prop-types';
import {
    Alert,
    View,
    StyleSheet,
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import UserPasswordInput from '../components/UserPasswordInput';
import { ROUTES, STATUS } from '../constants';
import * as  Remote from '../database/Remote';

export default class ForgotPasswordScreen extends React.Component {
    static propTypes = {
        route: PropTypes.object.isRequired,
        navigation: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            requestStatus: STATUS.INITIAL,
        };
        this.passwordField = React.createRef();
    }

    componentDidMount() {
        const hash = this.props.route.params?.hash;

        if (!hash) {
            this.showInvalidHashAlert();
        }
    }

    sendResetPasswordRequest = async () => {
        const hasValidPassword = this.passwordField.current.validate();
        if (!hasValidPassword) {
            this.setState({ requestStatus: STATUS.ERROR });
            return;
        }
        this.setState({ requestStatus: STATUS.PROGRESS });
        const { hash } = this.props.route.params;
        try {
            const result = await Remote.resetPassword(hash, this.state.password);
            if (!result) {
                this.showGeneralErrorAlert();
                this.setState({ requestStatus: STATUS.ERROR });
                return;
            }
            this.showSuccessAlert();
            this.setState({ requestStatus: STATUS.SUCCESS });
        } catch (e) {
            this.showGeneralErrorAlert();
            this.setState({ requestStatus: STATUS.ERROR });
        }
    }

    gotToLogin = () => {
        this.props.navigation.navigate(ROUTES.login);
    }

    showSuccessAlert = () => {
        Alert.alert(
            'Sucesso ao redefinir a senha',
            'Pronto, você já pode acessar o Agenda SUS normalmente.',
            [
                { text: 'OK', onPress: this.gotToLogin }
            ],
            { cancelable: false }
        );
    }

    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao redefinir a senha',
            'Houve um problema ao tentar redefinir a senha. Tente novamente em alguns instantes.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    showInvalidHashAlert = () => {
        Alert.alert(
            'Falha ao redefinir a senha',
            'O link que você recebeu está errado. Faça uma nova solicitação de recuperação de senha.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    onChangePassword = password => {
        this.setState({ password });
    }

    render() {
        return (
            <View style={styles.container} >
                <Text style={styles.headerText}>{'Para continuar, precisamos que você insira a nova senha.'}</Text>
                <UserPasswordInput ref={this.passwordField} onChangeText={this.onChangePassword} password={this.state.password} />
                <Button buttonStyle={styles.loginBtn} title={'Redefinir senha'} disabled={this.state.requestStatus === STATUS.PROGRESS} onPress={this.sendResetPasswordRequest} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { display: 'flex', paddingHorizontal: 10 },
});

