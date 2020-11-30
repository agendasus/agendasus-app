import * as React from 'react';
import PropTypes from 'prop-types';
import { Animated, useWindowDimensions, Image, StyleSheet } from 'react-native';
import {
  View,
  Text,
} from 'react-native-ui-lib';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';



const emptyList = () => {
  const windowHeight = useWindowDimensions().height;
  return (
    <View flex height={windowHeight / 2} center>
      <Image source={require('../../assets/undraw_doctors_hwty.png')}
        style={styles.img}
        resizeMode={'contain'}
      />
      <Text center text40>
        No momento você não tem nenhum agendamento.
        </Text>
    </View>
  );
};

const HeaderWithSearch = ({
  data, renderItem, keyExtractor, refreshing, ListFooterComponent, ItemSeparatorComponent, children,
}) => {
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
        ListEmptyComponent={emptyList()}
      />
      <CollapsibleSubHeaderAnimator translateY={translateY}>
        <View
          style={{ width: windowWidth }}
        >
          {children}
        </View>
      </CollapsibleSubHeaderAnimator>
    </>
  );
};

HeaderWithSearch.propTypes = {
  data: PropTypes.array.isRequired,
  renderItem: PropTypes.func.isRequired,
  keyExtractor: PropTypes.func.isRequired,
  refreshing: PropTypes.bool.isRequired,
  ListFooterComponent: PropTypes.func.isRequired,
  ItemSeparatorComponent: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

const styles = StyleSheet.create({
  img: {
    width: 280,
    height: 280,
    borderWidth: 1,
  },
});

export default HeaderWithSearch;
