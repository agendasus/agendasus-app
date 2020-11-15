import React, { PureComponent } from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants';

export default class FAB extends PureComponent {
    onPress = () => {
        this.props.onPress();
    }

    render() {
        return (
            <Icon
                color={'white'}
                borderColor={COLORS.azulSus}
                size={60}
                onPress={this.onPress}
                style={styles.containerStyle}
                {...this.props}
            />
        )
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        elevation: 10,
        backgroundColor: COLORS.azulSus,
        position: 'absolute',
        right: 25,
        bottom: 21,
        zIndex: 1,
        borderRadius: 50,
    },
});

