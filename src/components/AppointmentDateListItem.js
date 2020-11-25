import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
    ListItem,
} from 'react-native-elements';

import { formatDateAndTime } from '../utility/util';

export default class AppointmentDateListItem extends PureComponent {
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
            <ListItem key={item.id} bottomDivider onPress={this.onPress}>
                <ListItem.Content>
                    <ListItem.Title>{formatDateAndTime(item.date)}</ListItem.Title>
                </ListItem.Content>
            </ListItem>
        );
    }
}

