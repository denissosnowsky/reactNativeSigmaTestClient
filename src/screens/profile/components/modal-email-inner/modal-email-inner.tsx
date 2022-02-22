import React, { useState, VFC } from 'react';
import { View } from 'react-native';

import { Input } from '~components/common/input';
import styles from './modal-email-inner.style';

export const ModalEmailInner: VFC<Props> = ({ name, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Enter new email"
        value={name}
        onChange={onChange}
        style={styles.input}
        isUnderlined
      />
    </View>
  );
};

type Props = {
  name: string;
  onChange: (e: string) => void;
};
