import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { COLORS } from '../constants';

export default class FAB extends PureComponent {

    static propTypes = {
        onPress: PropTypes.func.isRequired,
    }

    onPress = () => {
        this.props.onPress();
    }

    render() {
        return (
            <View
                style={styles.containerStyle}
            >
                <Icon
                    type={'material-community'}
                    color={COLORS.azulSus}
                    raised
                    reverse
                    size={30}
                    onPress={this.onPress}
                    {...this.props}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        position: 'absolute',
        right: 20,
        bottom: 10,
        zIndex: 1,
        borderRadius: 50,
    },
});

