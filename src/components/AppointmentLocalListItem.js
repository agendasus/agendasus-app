import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    ListItem,
} from 'react-native-elements';

export default class AppointmentLocalListItem extends PureComponent {
    propTypes = {
        item: PropTypes.object.isRequired,
        onPress: PropTypes.func.isRequired,
    };

    onPress = () => {
        this.props.onPress(this.props.item);
    }

    render() {
        const { item } = this.props;
        return (
            <ListItem key={item.id} bottomDivider onPress={this.onPress}>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }
}

