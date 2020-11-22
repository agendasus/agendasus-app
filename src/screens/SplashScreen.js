import * as React from 'react';
import {
    View,
    ActivityIndicator,
    Text,
    StyleSheet,
} from 'react-native';

import { COLORS } from '../constants';

export default class SplashScreen extends React.Component {

    render() {
        return (
            <View testID={'loading'} style={styles.container}>
                <Text style={styles.text}>
                    Agenda SUS
                </Text>
                <ActivityIndicator color={COLORS.azulSus} size={'large'} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: { display: 'flex', flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
    text: { color: COLORS.azulSus, fontSize: 32, fontWeight: 'bold' },
});
