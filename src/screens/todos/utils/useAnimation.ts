import { useEffect } from 'react';
import { Animated } from 'react-native';

import { animationWithTime } from '~utils/animationWithTime';

export const useAnimation = (
  scrollY: Animated.Value,
  scrollAnimatedOffset: number,
  headerScaleAndOpacity: Animated.Value,
  headerHeight: Animated.Value,
  headerPaddingTop: Animated.Value,
  headerEndTopPadding: number,
  headerInitHeight: number,
  headerInitTopPadding: number,
) => {
  useEffect(() => {
    const id = scrollY.addListener((v) => {
      let isAnimationStartScrollActivated = false;
      let isAnimationEndScrollActivated = false;

      if (v.value > scrollAnimatedOffset && !isAnimationStartScrollActivated) {
        Animated.parallel([
          animationWithTime(headerScaleAndOpacity, 0, 150),
          animationWithTime(headerHeight, 0, 150),
          animationWithTime(headerPaddingTop, headerEndTopPadding, 150),
        ]).start();

        isAnimationStartScrollActivated = true;
        isAnimationEndScrollActivated = false;
      }

      if (v.value < scrollAnimatedOffset && !isAnimationEndScrollActivated) {
        Animated.parallel([
          animationWithTime(headerScaleAndOpacity, 1, 100),
          animationWithTime(headerHeight, headerInitHeight, 100),
          animationWithTime(headerPaddingTop, headerInitTopPadding, 100),
        ]).start();

        isAnimationEndScrollActivated = true;
        isAnimationStartScrollActivated = false;
      }
    });
    return () => scrollY.removeListener(id);
  }, [scrollY]);
};
