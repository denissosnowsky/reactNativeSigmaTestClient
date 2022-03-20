import { SetStateAction } from 'react';
import { Animated } from 'react-native';
import { animationWithTime } from '~utils/animationWithTime';

export const dropdownAnimation = (
  filter: boolean,
  filtersHeight: Animated.Value,
  filtersEndHeight: number,
  filtersScaleAndOpacity: Animated.Value,
  filtersEndScale: number,
  setFilter: (value: SetStateAction<boolean>) => void,
) => {
  if (!filter) {
    Animated.sequence([
      animationWithTime(filtersHeight, filtersEndHeight, 100),
      animationWithTime(filtersScaleAndOpacity, filtersEndScale, 100),
    ]).start();
    setFilter(true);
  } else {
    Animated.sequence([
      animationWithTime(filtersScaleAndOpacity, 0, 100),
      animationWithTime(filtersHeight, 0, 100),
    ]).start();
    setFilter(false);
  }
};
