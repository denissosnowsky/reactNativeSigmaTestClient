import { Button } from 'native-base';
import React, { useContext, VFC } from 'react';

import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import styles from './button-out.style';

export const ButtonOut: VFC<Props> = ({ onPress }) => {
  const theme = useContext(ThemeContext);

  return (
    <Button
      variant="link"
      _text={{
        color: globalStyles.LIGHT_MAIN_COLOR,
        fontSize: globalStyles.MID_FS,
      }}
      style={styles.question}
      onPress={onPress}
    >
      Go back to authorization
    </Button>
  );
};

type Props = {
  onPress: () => void;
};
