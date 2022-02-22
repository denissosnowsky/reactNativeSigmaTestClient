import React, { useState, VFC } from 'react';
import { View } from 'react-native';

import { Input } from '~components/common/input';
import styles from './modal-pass-inner.style';

export const ModalPassInner: VFC<Props> = ({
  oldPass,
  onChangeOldPass,
  newPass,
  onChangeNewPass,
  confirmPass,
  onChangeConfirmPass,
}) => {
  return (
    <View style={styles.wrapper}>
      <Input
        placeholder="Enter old password"
        value={oldPass}
        onChange={onChangeOldPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
      <Input
        placeholder="Enter new password"
        value={newPass}
        onChange={onChangeNewPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
      <Input
        placeholder="Confirm new password"
        value={confirmPass}
        onChange={onChangeConfirmPass}
        style={styles.input}
        isUnderlined
        secureTextEntry
      />
    </View>
  );
};

type Props = {
  oldPass: string;
  onChangeOldPass: (e: string) => void;
  newPass: string;
  onChangeNewPass: (e: string) => void;
  confirmPass: string;
  onChangeConfirmPass: (e: string) => void;
};
