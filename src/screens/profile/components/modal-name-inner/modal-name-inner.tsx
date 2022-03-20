import React, { useState, VFC } from 'react';
import { View } from 'react-native';

import { Input } from '~components/common/input';
import styles from './modal-name-inner.style';

export const ModalNameInner: VFC<Props> = ({ name, onChange }) => {
  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Enter new name"
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
