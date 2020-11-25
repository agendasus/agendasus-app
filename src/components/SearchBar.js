import React, { PureComponent } from 'react';
import { ActivityIndicator, Keyboard, ScrollView, StyleSheet, FlatList, TextInput } from 'react-native';
import {
    View,
    Text,
    KeyboardAwareFlatList,
    KeyboardAwareScrollView,
    TextField,
} from 'react-native-ui-lib';
import {
    ListItem,
    BottomSheet,
    Button,
    Input,
    Icon,
} from 'react-native-elements';

import debounce from 'lodash/debounce';
import { COLORS } from '../constants';

// import { COLORS } from '../../constants';

// import * as Remote from '../../database/Remote';

const SEARCH_DELAY = 500;

export default class SearchBar extends PureComponent {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '',
            loading: false,
        }
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
                <View row >
                    <View bottom style={{ flex: .9 }}>
                        <TextInput
                            style={{ borderBottomWidth: 1, fontSize: 20, }}
                            placeholder={'Procure por um local'}
                            onChangeText={this.onChangeText}
                            value={this.state.searchValue}
                        />
                    </View>
                    <View flex center style={{ flex: .1 }}>
                        {
                            !this.state.searchValue
                            &&
                            (
                                <Icon
                                    type={'material-community'}
                                    name={'close'}
                                    containerStyle={{ paddingHorizontal: 10 }}
                                    size={20} color={'black'}
                                    onPress={this.onClearSearchField}
                                />
                            )
                        }
                    </View>

                </View >
            </ScrollView >
        );
    }
}
