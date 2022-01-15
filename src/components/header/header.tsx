import React, { VFC } from 'react';
import { Image, View } from 'react-native';

import styles from './header.style';

export const Header: VFC = () => (
  <View style={styles.wrapepr}>
    <Image source={require('~assets/todo.png')} style={styles.image} />
  </View>
);
