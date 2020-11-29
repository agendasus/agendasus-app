import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
} from 'react-native';
import {
    Text,
    Card,
} from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../constants';

export default class AppointmentTypeListItem extends PureComponent {
    static propTypes = {
        item: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    onPress = () => {
        this.props.onPress(this.props.item);
    }

    render() {
        const { item } = this.props;
        return (
            <Card key={item.id} center marginV-10 style={styles.container}
                onPress={this.onPress}
            >
                <Icon name={item.icon} size={30} color={COLORS.azulSus} />
                <Text>{item.name}</Text>
            </Card>
        );
    }
}

const styles = StyleSheet.create({
    container: { elevation: 10, width: 150, height: 150 },
});
