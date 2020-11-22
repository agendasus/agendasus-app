import * as React from 'react';
import { Animated, View, useWindowDimensions } from 'react-native';
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