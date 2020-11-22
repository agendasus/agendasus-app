import * as React from 'react';
import { Animated, View, useWindowDimensions, FlatList, Platform } from 'react-native';
import {
    useCollapsibleSubHeader,
    CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';

const HeaderWithSearch = ({ data, renderItem, keyExtractor, refreshing, ListFooterComponent, ItemSeparatorComponent, children }) => {
    const {
        onScroll,
        containerPaddingTop,
        scrollIndicatorInsetTop,
        translateY,
    } = useCollapsibleSubHeader();
    const paddingHeight = 150;
    const windowWidth = useWindowDimensions().width;
    return (
        <>
            <Animated.FlatList
                data={data}
                onScroll={onScroll}
                contentContainerStyle={{ paddingTop: containerPaddingTop }}
                scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                refreshing={refreshing}
                ListFooterComponent={ListFooterComponent}
                ItemSeparatorComponent={ItemSeparatorComponent}
            // progressViewOffset={paddingHeight}
            // contentInset={{ top: paddingHeight }}
            // contentContainerStyle={{ paddingTop: Platform.OS === 'ios' ? 0 : paddingHeight }}
            // contentOffset={{ y: -paddingHeight }}
            />
            <CollapsibleSubHeaderAnimator translateY={translateY}>
                <View
                    style={{ width: windowWidth }}
                >
                    {children}
                </View>
            </CollapsibleSubHeaderAnimator>
        </>
    )
}

export default HeaderWithSearch;