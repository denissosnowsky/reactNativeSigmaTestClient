import React, { VFC } from 'react';
import { View, Text } from 'react-native';

import globalStyles from '~global/constants.style';
import styles from './alert.style';

export const Alert: VFC<Props> = ({ status, text, isShown }) => {
  return (
    <>
      {isShown && (
        <View
          testID="alert-wrapper"
          style={[
            styles.wrapper,
            {
              backgroundColor:
                status === 'error'
                  ? globalStyles.LIGHT_ERROR_ALERT_BG
                  : globalStyles.LIGHT_SUCCESS_ALERT_BG,
            },
          ]}
        >
          <Text style={styles.text} testID="text">
            {text}
          </Text>
        </View>
      )}
    </>
  );
};

type Props = {
  text: string;
  isShown: boolean;
  status: 'error' | 'info' | 'warning' | 'success';
};
