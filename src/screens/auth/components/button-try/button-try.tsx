import { Button } from 'native-base';
import React, { useContext, VFC } from 'react';

import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import styles from './button-try.style';

export const ButtonTry: VFC<Props> = ({ isHide, onPress }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {!isHide && (
        <Button
          variant="link"
          _text={{
            color: globalStyles.LIGHT_MAIN_COLOR,
          }}
          style={styles.question}
          onPress={onPress}
        >
          Try without registration
        </Button>
      )}
    </>
  );
};

type Props = {
  isHide: boolean;
  onPress: () => void;
};
