import React, { VFC } from 'react';
import { Button } from 'native-base';

import globalStyles from '~global/constants.style';
import styles from './button-submit.style';

export const ButtonSubmit: VFC<Props> = ({
  haveAccount,
  isLoading,
  onSignInHandler,
  onSignUpHandler,
}) => {
  return (
    <Button
      size="lg"
      _text={{
        fontSize: globalStyles.MAIN_FS,
      }}
      colorScheme="blue"
      onPress={haveAccount ? onSignInHandler : onSignUpHandler}
      isLoading={isLoading}
      disabled={isLoading}
      style={styles.button}
    >
      {haveAccount ? 'Sign In' : 'Sign Up'}
    </Button>
  );
};

type Props = {
  haveAccount: boolean;
  isLoading: boolean;
  onSignInHandler: () => void;
  onSignUpHandler: () => void;
};
