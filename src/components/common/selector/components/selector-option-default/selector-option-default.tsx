import React, { useContext, VFC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import { BlueText } from '~components/common/text';
import { ThemeContext } from '~contexts';
import globalStyles from '~global/constants.style';
import { setArrowDirection } from '../../utils/setArrowDirection';
import styles from './selector-option-default.style';

export const SelectorOptionDefault: VFC<Props> = ({
  chosenOptionName,
  dropdownOpened,
  onDropdownOpenedHandle,
  style,
}) => {
  const theme = useContext(ThemeContext);

  return (
    <View style={[styles.selector, { backgroundColor: theme.listItemBG }, style]}>
      <View style={styles.textWrapper}>
        <BlueText fs={globalStyles.MAIN_FS} style={styles.dropdownItemText}>
          {chosenOptionName}
        </BlueText>
      </View>
      <View style={styles.iconWrapper}>
        <ButtonIcon
          variant={setArrowDirection(dropdownOpened)}
          size={globalStyles.ICON_ARROW_SIZE}
          onPress={onDropdownOpenedHandle}
        />
      </View>
    </View>
  );
};

type Props = {
  chosenOptionName: string;
  dropdownOpened: boolean;
  onDropdownOpenedHandle: () => void;
  style?: StyleProp<ViewStyle>;
};
