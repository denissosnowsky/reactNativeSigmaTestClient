import React, { forwardRef, Ref, VFC } from 'react';
import { View } from 'react-native';

import { Input } from '~components/common/input';
import { BlueText } from '~components/common/text';
import globalStyles from '~global/constants.style';
import styles from './list-item-text.style';

export const ListItemText: VFC<Props> = forwardRef(
  ({ isEditing, text, inputValue, isCompleted, onChange }, ref: Ref<HTMLInputElement>) => {
    return (
      <View style={[styles.text]}>
        {isEditing ? (
          <Input placeholder="Enter todo" value={inputValue} onChange={onChange} ref={ref} />
        ) : (
          <BlueText fs={globalStyles.MAIN_FS} isCrossed={isCompleted}>
            {text}
          </BlueText>
        )}
      </View>
    );
  },
);

type Props = {
  isEditing: boolean;
  text: string;
  inputValue: string;
  isCompleted: boolean;
  onChange: (value: string) => void;
  ref?: Ref<HTMLInputElement>;
};
