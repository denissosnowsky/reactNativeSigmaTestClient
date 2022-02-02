import { Animated, Easing } from 'react-native';

export const animationWithTime = (
  from: Animated.Value | Animated.ValueXY,
  to: number,
  time: number,
) => {
  return Animated.timing(from, {
    toValue: to,
    duration: time,
    useNativeDriver: false,
    easing: Easing.inOut(Easing.linear),
  });
};
