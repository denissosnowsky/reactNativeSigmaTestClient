import React, { VFC } from 'react';
import { Alert as AlertNB, HStack, VStack, Text } from 'native-base';

import styles from './alert.style';

export const Alert: VFC<Props> = ({ status, text, isShown }) => {
  return (
    <AlertNB
      w="75%"
      status={status}
      style={[styles.wrapper, isShown ? styles.isShown : styles.isHidden]}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <AlertNB.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800" style={styles.text}>
              {text}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </AlertNB>
  );
};

type Props = {
  status: 'error' | 'info' | 'warning' | 'success';
  text: string;
  isShown: boolean;
};
