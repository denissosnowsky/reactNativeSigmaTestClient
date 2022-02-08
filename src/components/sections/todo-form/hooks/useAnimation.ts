import { useEffect } from 'react';
import { Animated } from 'react-native';
import { animationWithTime } from '~utils/animationWithTime';

export const useAnimation = (
  listScrollY: Animated.Value,
  scrollAnimatedOffset: number,
  letterScaleAndOpacity: Animated.Value,
  letterWidth: Animated.Value,
  logoLetterWidth: number,
) => {
  useEffect(() => {
    const aniamtionId = listScrollY.addListener((v) => {
      let isAnimationStartScrollActivated = false;
      let isAnimationEndScrollActivated = false;

      if (v.value > scrollAnimatedOffset && !isAnimationStartScrollActivated) {
        Animated.parallel([
          animationWithTime(letterScaleAndOpacity, 1, 150),
          animationWithTime(letterWidth, logoLetterWidth, 150),
        ]).start();

        isAnimationStartScrollActivated = true;
        isAnimationEndScrollActivated = false;
      }

      if (v.value < scrollAnimatedOffset && !isAnimationEndScrollActivated) {
        Animated.parallel([
          animationWithTime(letterScaleAndOpacity, 0, 100),
          animationWithTime(letterWidth, 0, 100),
        ]).start();

        isAnimationEndScrollActivated = true;
        isAnimationStartScrollActivated = false;
      }
    });
    return () => listScrollY.removeListener(aniamtionId);
  }, [listScrollY]);
};
