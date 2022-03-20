import React, { VFC } from 'react';
import { Animated } from 'react-native';

import { Header } from '~components/header';

export const TodosHeader: VFC<Props> = ({ headerScaleAndOpacity, headerHeight }) => {
  return (
    <Animated.View
      style={{
        transform: [{ scale: headerScaleAndOpacity }],
        height: headerHeight,
        opacity: headerScaleAndOpacity,
      }}
    >
      <Header />
    </Animated.View>
  );
};

type Props = {
  headerScaleAndOpacity: Animated.Value;
  headerHeight: Animated.Value;
};
