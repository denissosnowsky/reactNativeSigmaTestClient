import React, { VFC } from 'react';
import { TouchableOpacity } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import { BlueText } from '~components/common/text';
import globalStyles from '~global/constants.style';
import { IconsNames } from '~types/todo.types';
import styles from './selector-option.style';

export const SelectorOption: VFC<Props> = ({ iconVariant, text, onPress }) => {
  return (
    <TouchableOpacity style={styles.dropdownItem} onPress={onPress}>
      <ButtonIcon variant={iconVariant} size={globalStyles.ICON_EXSM_SIZE} />
      <BlueText fs={globalStyles.MAIN_FS} style={styles.dropdownItemText}>
        {text}
      </BlueText>
    </TouchableOpacity>
  );
};

export type Props = {
  iconVariant: IconsNames;
  text: string;
  onPress: () => void;
};
