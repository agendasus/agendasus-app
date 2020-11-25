import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Input,
} from 'react-native-elements';

import { COLORS } from '../constants';

export default class UserPasswordInput extends PureComponent {

    static propTypes = {
        password: PropTypes.string.isRequired,
        onChangeText: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            passwordError: '',
        };
        this.inputField = React.createRef();
    }

    onChangeValue = newValue => {
        this.setState({ passwordError: '' });
        this.props.onChangeText(newValue);
    }

    validate = () => {
        const password = this.props.password;
        const hasRequiredFieldError = !!password;
        if (!hasRequiredFieldError) {
            this.setState({ passwordError: 'Campo obrigatório' });
            return false;
        }
        const hasPasswordLengthError = password.length >= 6 && password.length < 30;
        if (!hasPasswordLengthError) {
            this.setState({ passwordError: 'A senha precisa ter entre 6 e 30 caracteres' });
            return false;
        }
        return true;
    }

    focus = () => {
        this.inputField.current.focus();
    }

    render() {
        return (
            <Input
                keyboardType={'numeric'}
                label={'Senha'}
                leftIcon={{ type: 'material-community', name: 'lock', color: COLORS.defaultGray }}
                floatingPlaceholderColor={COLORS.azulSus}
                placeholder={'Senha'}
                maxLength={30}
                secureTextEntry={true}
                {...this.props}
                ref={this.inputField}
                errorMessage={this.state.passwordError}
                value={this.props.password}
                onChangeText={this.onChangeValue}
            />
        );
    }
}