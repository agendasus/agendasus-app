import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ScrollView, TextInput, StyleSheet } from 'react-native';
import {
    View,
} from 'react-native-ui-lib';
import {
    Icon,
} from 'react-native-elements';

import debounce from 'lodash/debounce';

const SEARCH_DELAY = 500;

export default class SearchBar extends PureComponent {

    static propTypes = {
        search: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            loading: false,
        };
        this.search = debounce(this.search.bind(this), SEARCH_DELAY);
    }

    search(text) {
        this.props?.search(text);
    }

    onChangeText = searchValue => {
        this.setState({ searchValue });
        this.search(searchValue);
    }

    onClearSearchField = () => {
        Keyboard.dismiss();
        this.setState({ searchValue: '' });
        this.search('');
    }

    render() {
        return (
            <ScrollView keyboardShouldPersistTaps={'always'} >
                <View row>
                    <View bottom style={styles.header}>
                        <TextInput
                            style={styles.headerInput}
                            placeholder={'Procure por um local'}
                            onChangeText={this.onChangeText}
                            value={this.state.searchValue}
                        />
                    </View>
                    <View center>
                        {
                            !!this.state.searchValue
                            &&
                            (
                                <View flex center style={styles.headerInput}>

                                    <Icon
                                        type={'material-community'}
                                        name={'close'}
                                        containerStyle={styles.closeIconContainerStyle}
                                        size={20} color={'black'}
                                        onPress={this.onClearSearchField}
                                    />
                                </View>
                            )
                        }
                    </View>
                </View >
            </ScrollView >
        );
    }
}

const styles = StyleSheet.create({
    header: { flex: 1 },
    headerInput: { borderBottomWidth: 1, fontSize: 20, },
    closeIconContainerStyle: { paddingHorizontal: 10 },
});
