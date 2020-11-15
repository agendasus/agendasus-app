import * as React from 'react';
import {
    TextField,
    View,
} from 'react-native-ui-lib';

import { COLORS } from '../constants';

export default class UserPasswordInput extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            passwordError: '',
        };
        this.inputField = React.createRef();
    }

    onChangeValue = newValue => {
        this.setState({ passwordError: '' });
        this.props.onChangeText(newValue);
    }

    validar = () => {
        const password = this.props.password;
        const hasRequiredFieldError = !!password;
        if (!hasRequiredFieldError) {
            this.setState({ passwordError: 'Campo obrigatório' });
            return false;
        }
        const hasPasswordLengthError = password.length >= 6 && password.length < 30;
        if (!hasPasswordLengthError) {
            this.setState({ passwordError: 'A password precisa ter entre 6 e 30 caracteres' });
            return false;
        }
        return true;
    }

    focus = () => {
        this.inputField.current.focus();
    }

    render() {
        return (
            <View paddingB-10 paddingT-5>
                <TextField
                    text50
                    paddingB10
                    keyboardType={'numeric'}
                    title={'Senha'}
                    titleColor={COLORS.azulSus}
                    floatingPlaceholder={true}
                    floatingPlaceholderColor={COLORS.azulSus}
                    placeholder={'Senha'}
                    helperText={'Senha'}
                    maxLength={30}
                    secureTextEntry={true}
                    {...this.props}
                    ref={this.inputField}
                    error={this.state.passwordError}
                    value={this.props.password}
                    onChangeText={this.onChangeValue}
                />
            </View>
        )
    }
}