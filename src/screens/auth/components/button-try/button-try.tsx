import { Button } from 'native-base';
import React, { useContext, VFC } from 'react';

import { ThemeContext } from '~contexts';
import styles from './button-try.style';

export const ButtonTry: VFC<Props> = ({ isHide, onPress }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {!isHide && (
        <Button
          variant="unstyled"
          _text={{
            color: '#ff0000',
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
