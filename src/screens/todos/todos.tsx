import React, { useContext, useEffect, useRef, VFC } from 'react';
import { Animated, Easing, Keyboard, TouchableWithoutFeedback, View } from 'react-native';

import { Header } from '~components/header';
import { TodoForm } from '~components/sections/todo-form';
import { TodoList } from '~components/sections/todo-list';
import { ThemeContext } from '~contexts';
import { Theme } from '~components/containers/theme/theme';
import styles from './todos.style';

export const Todos: VFC = () => {
  const headerInitHeight = 90;
  const scrollAnimatedOffset = 20;
  const theme = useContext(ThemeContext);
  const scrollY = useRef(new Animated.Value(0)).current;
  const headerScaleAndOpacity = useRef(new Animated.Value(1)).current;
  const headerHeight = useRef(new Animated.Value(headerInitHeight)).current;

  const onScroll = Animated.event(
    [
      {
        nativeEvent: {
          contentOffset: {
            y: scrollY,
          },
        },
      },
    ],
    { useNativeDriver: false },
  );

  useEffect(() => {
    const id = scrollY.addListener((v) => {
      let isAnimationStartScrollActivated = false;
      let isAnimationEndScrollActivated = false;

      if (v.value > scrollAnimatedOffset && !isAnimationStartScrollActivated) {
        Animated.parallel([
          Animated.timing(headerScaleAndOpacity, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.linear),
          }),
          Animated.timing(headerHeight, {
            toValue: 0,
            duration: 150,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.linear),
          }),
        ]).start();

        isAnimationStartScrollActivated = true;
        isAnimationEndScrollActivated = false;
      }

      if (v.value < scrollAnimatedOffset && !isAnimationEndScrollActivated) {
        Animated.parallel([
          Animated.timing(headerScaleAndOpacity, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.linear),
          }),
          Animated.timing(headerHeight, {
            toValue: headerInitHeight,
            duration: 100,
            useNativeDriver: false,
            easing: Easing.inOut(Easing.linear),
          }),
        ]).start();

        isAnimationEndScrollActivated = true;
        isAnimationStartScrollActivated = false;
      }
    });
    return () => scrollY.removeListener(id);
  }, [scrollY]);

  return (
    <Theme>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View
          style={[styles.container, { backgroundColor: theme.background }]}
          testID="todosWrapper"
        >
          <Animated.View
            style={{
              transform: [{ scale: headerScaleAndOpacity }],
              height: headerHeight,
              opacity: headerScaleAndOpacity,
            }}
          >
            <Header />
          </Animated.View>
          <View style={[styles.body]}>
            <TodoForm listScrollY={scrollY} scrollAnimatedOffset={scrollAnimatedOffset} />
            <TodoList onScroll={onScroll} />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Theme>
  );
};
