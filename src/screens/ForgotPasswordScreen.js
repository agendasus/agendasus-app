import * as React from 'react';
import { Alert, } from "react-native";
import { Text, View, Button, TextField, KeyboardAwareScrollView } from 'react-native-ui-lib';
import ModalResult from '../components/ModalResult';

import { COLORS, STATUS } from '../constants';
import Remote from '../database/Remote';

export default class ResetPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            requestStatus: STATUS.INICIAL,
            userError: '',
            user: this.props.route.params.user,
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
            'Falha ao redefinir a password',
            'Não foi possível redefinir a password. Tente novamente em alguns instantes.',
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
            return 'Não foi possível redefinir a password. Tente novamente em alguns instantes.';
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
            <View flex spread paddingH-10 paddingV-10 >
                <Text text60 marginB-10>
                    Você esqueceu sua password? Não tem problema. Nos diga qual o usuário
                    você deseja redefinir a senha.
                </Text>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    getTextInputRefs={() => {
                        return [
                            this.userField,
                        ];
                    }}
                >
                    <TextField
                        ref={this.userField}
                        error={userError}
                        value={user}
                        text50
                        title={'Usuário'}
                        placeholder={'Usuário'}
                        helperText={'Usuário'}
                        titleColor={COLORS.azulSus}
                        floatingPlaceholder={true}
                        floatingPlaceholderColor={COLORS.azulSus}
                        onChangeText={this.changeUser}
                        maxLength={150}
                    />
                    <Button
                        br20
                        backgroundColor={COLORS.azulSus}
                        label={'Redefinir senha'}
                        onPress={this.startResetPasswordProccess}
                    />
                </KeyboardAwareScrollView>
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
