import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Button,
} from 'react-native-ui-lib';
import {
    Modal,
    ActivityIndicator,
    Image,
} from 'react-native';

import { COLORS, STATUS } from '../constants';

export default class ModalResult extends PureComponent {
    propTypes = {
        requestStatus: PropTypes.oneOf([STATUS.PROGRESS, STATUS.ERROR, STATUS.SUCCESS]).isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.func.isRequired,
        close: PropTypes.func.isRequired,
        visible: PropTypes.bool.isRequired,
    }

    mountModalContent = () => {
        if (this.props.requestStatus === STATUS.PROGRESS) {
            return (
                <>
                    <Text text60> {this.props.title}</Text>
                    <ActivityIndicator color={COLORS.azulSus} size='large' />
                </>
            );
        }
        //TODO essas cores nao podem ficar assim, tem que ir pra constante
        const corIcone = this.props.requestStatus === STATUS.ERROR ? 'red' : 'green';
        //TODO ficou meio estranho, repensar isso aqui - talvez criar um componente com cada imagem
        const icone = this.props.requestStatus === STATUS.ERROR ? require('../../assets/baseline_error_black_48.png') : require('../../assets/baseline_done_black_48.png');
        return (
            <View flex center paddingH-30 >
                <Image source={icone}
                    //TODO colocar os estilos em um arquivo separado
                    style={{
                        width: 80,
                        height: 80,
                        borderWidth: 1,
                    }}
                    tintColor={corIcone}
                    resizeMode={'contain'}
                />
                <Text text60 marginV-20>{this.props.description()}</Text>
                <Button
                    backgroundColor={COLORS.azulSus}
                    label={'Fechar'}
                    onPress={this.props.close}
                />
            </View>
        );
    }

    render() {
        return (
            <Modal
                animationType='fade'
                presentationStyle={'formSheet'}
                visible={this.props.visible}
            >
                <View flex center >
                    {this.mountModalContent()}
                </View>
            </Modal>
        );
    }
}