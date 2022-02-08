import React, { VFC } from 'react';
import { Animated, TouchableWithoutFeedback } from 'react-native';

import { TitleLetterSVG } from '~components/common/svg';
import styles from './todo-form-letter.style';

export const TodoFormLetter: VFC<Props> = ({
  letterScaleAndOpacity,
  letterWidth,
  titleColor,
  setTitleColor,
}) => {
  return (
    <TouchableWithoutFeedback onPress={setTitleColor} accessibilityRole="button">
      <Animated.View
        style={[
          styles.letterWrapper,
          {
            transform: [{ scale: letterScaleAndOpacity }],
            width: letterWidth,
            opacity: letterScaleAndOpacity,
          },
        ]}
      >
        <TitleLetterSVG color={titleColor} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  titleColor: string;
  letterWidth: Animated.Value;
  letterScaleAndOpacity: Animated.Value;
  setTitleColor: () => void;
};
