import * as React from 'react';
import PropTypes from 'prop-types';
import { Alert, View, StyleSheet } from 'react-native';
import { Text, Button, Input } from 'react-native-elements';
import ModalResult from '../components/ModalResult';

import { COLORS, STATUS } from '../constants';
import * as  Remote from '../database/Remote';

export default class ResetPasswordScreen extends React.Component {

    propTypes = {
        route: PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            requestStatus: STATUS.INICIAL,
            userError: '',
            user: this.props.route.params?.user,
        };
        this.userField = React.createRef();
    }

    startResetPasswordProccess = async () => {
        const { user } = this.state;
        let userError = '';
        //TODO de novo? é bom centralizar hein
        const requiredFieldText = 'Este campo é obrigatório';
        if (!user) {
            userError = requiredFieldText;
        }
        if (userError) {
            this.setState({ userError });
            return;
        }
        this.setState({ requestStatus: STATUS.PROGRESS });
        try {
            //TODO e se o usuário nao existir? Esperar o Vinicius arrumar no servidor para tratar aqui
            await Remote.sendPasswordResetRequest(user);
            this.setState({ requestStatus: STATUS.SUCCESS });
        } catch (e) {
            this.showGeneralErrorAlert();
            this.setState({ requestStatus: STATUS.ERROR });
        }
    };

    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao redefinir a senha',
            'Não foi possível redefinir a senha. Tente novamente em alguns instantes.',
            [
                { text: 'OK', onPress: () => this.setState({ requestStatus: STATUS.ERROR }) }
            ],
            { cancelable: false }
        );
    }

    closeModal = () => {
        this.setState({ requestStatus: STATUS.INICIAL });
    };

    changeUser = user => {
        this.setState({ user });
    };

    mountModalResultDescription = () => {
        const { requestStatus } = this.state;
        if (requestStatus === STATUS.PROGRESS) {
            return 'Um email será enviado com o guia para redefinição da senha.';
        }
        if (requestStatus === STATUS.ERROR) {
            return 'Não foi possível redefinir a senha. Tente novamente em alguns instantes.';
        }
        if (requestStatus === STATUS.SUCCESS) {
            return 'Enviamos um email com o guia para a redefinição da senha.';
        }
    };

    render() {
        const { user, userError, requestStatus } = this.state;
        const shouldShow = [
            STATUS.PROGRESS,
            STATUS.SUCCESS,
            STATUS.ERROR,
        ].includes(requestStatus);
        return (
            <View style={{ display: 'flex', paddingHorizontal: 10 }} >
                <Text style={styles.headerText}>
                    {'Você esqueceu sua senha? Não tem problema. Nos diga qual o usuário você deseja redefinir a senha.'}
                </Text>
                <Input
                    ref={this.userField}
                    errorMessage={userError}
                    value={user}
                    label={'E-mail'}
                    placeholder={'E-mail'}
                    titleColor={COLORS.azulSus}
                    onChangeText={this.changeUser}
                    maxLength={150}
                    leftIcon={{ type: 'material-community', name: 'email', color: COLORS.defaultGray }}
                />
                <Button buttonStyle={styles.loginBtn} title={'Redefinir senha'} disabled={shouldShow} onPress={this.startResetPasswordProccess} />
                <ModalResult
                    title={'Redefinindo senha'}
                    description={this.mountModalResultDescription}
                    requestStatus={requestStatus}
                    visible={shouldShow}
                    close={this.closeModal}
                />
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
