import { Button } from 'native-base';
import React, { useContext, VFC } from 'react';

import { ThemeContext } from '~contexts';
import styles from './button-question.style';

export const ButtonQuestion: VFC<Props> = ({ isHide, haveAccount, onPress }) => {
  const theme = useContext(ThemeContext);

  return (
    <>
      {!isHide && (
        <Button
          variant="link"
          _text={{
            color: theme.button,
          }}
          style={styles.question}
          onPress={onPress}
        >
          {haveAccount ? "Don't have an account?" : 'Already have an account?'}
        </Button>
      )}
    </>
  );
};

type Props = {
  isHide: boolean;
  haveAccount: boolean;
  onPress: () => void;
};
