import React, { VFC } from 'react';
import { Alert as AlertNB, HStack, VStack, Text } from 'native-base';

import globalStyles from '~global/constants.style';
import styles from './alert.style';

export const Alert: VFC<Props> = ({ status, text, isShown }) => {
  return (
    <>
      {isShown && (
        <AlertNB
          testID="alert-wrapper"
          w={globalStyles.CONTAINER_WD}
          status={status}
          style={[styles.wrapper]}
        >
          <VStack
            space={globalStyles.SPACE}
            flexShrink={globalStyles.FLEX_SHRINK}
            w={globalStyles.FULL_WD}
          >
            <HStack flexShrink={1} space={globalStyles.SPACE} justifyContent="space-between">
              <HStack space={globalStyles.FLEX_SHRINK} flexShrink={globalStyles.FLEX_SHRINK}>
                <AlertNB.Icon mt={globalStyles.MT} />
                <Text
                  fontSize="md"
                  color={globalStyles.LIGHT_NB_GREY_COLOR}
                  style={styles.text}
                  testID="text"
                >
                  {text}
                </Text>
              </HStack>
            </HStack>
          </VStack>
        </AlertNB>
      )}
    </>
  );
};

type Props = {
  text: string;
  isShown: boolean;
  status: 'error' | 'info' | 'warning' | 'success';
};
