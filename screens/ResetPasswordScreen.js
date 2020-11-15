import * as React from 'react';
import {
    Alert,
    ActivityIndicator,
} from "react-native";
import { Text, View, Button, KeyboardAwareScrollView } from 'react-native-ui-lib';
import UserPasswordInput from '../components/UserPasswordInput';
import { ROUTES, COLORS, STATUS } from '../constants';
import Remote from '../database/Remote';

export default class ForgotPasswordScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            requestStatus: STATUS.INICIAL,
        };
        this.passwordField = React.createRef();
    }

    sendResetPasswordRequest = async () => {
        const hasValidPassword = this.passwordField.current.validar();
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

    //TODO de novo? acho bom centralizar e reaproveitar
    showSuccessAlert = () => {
        Alert.alert(
            'Sucesso ao redefinir a password',
            'Pronto, você já pode acessar o Agenda SUS normalmente.',
            [
                { text: 'OK', onPress: () => this.props.navigation.replace(ROUTES.login) }
            ],
            { cancelable: false }
        );
    }

    //TODO de novo? acho bom centralizar e reaproveitar
    showGeneralErrorAlert = () => {
        Alert.alert(
            'Falha ao redefinir a password',
            'Houve um problema ao tentar redefinir a password. Tente novamente em alguns instantes.',
            [
                { text: 'OK' }
            ],
            { cancelable: false }
        );
    }

    render() {
        return (
            <View flex spread paddingH-10 paddingV-10 >
                <Text text60>Para continuar, precisamos que você insira a nova senha.</Text>
                <KeyboardAwareScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardDismissMode="interactive"
                    keyboardShouldPersistTaps="always"
                    getTextInputRefs={() => {
                        return [
                            this.passwordField,
                        ];
                    }}
                    contentContainerStyle={{ paddingTop: 20 }}
                >
                    <UserPasswordInput ref={this.passwordField} onChangeText={password => this.setState({ password })} password={this.state.password} />
                    <Button
                        disabled={this.state.requeststatus === STATUS.PROGRESS}
                        br20
                        backgroundColor={COLORS.azulSus}
                        label={'Redefinir'}
                        onPress={this.sendResetPasswordRequest}
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
