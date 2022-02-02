import React, { useContext, useState, VFC } from 'react';
import {
  StyleProp,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { ThemeContext } from '~contexts';

import globalStyles from '~global/constants.style';
import { ButtonIcon } from '../button-icon';
import { BlueText } from '../text';
import styles from './selector.style';

export const Selector: VFC<Props> = ({ style, data }) => {
  const theme = useContext(ThemeContext);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [chosen, setChosen] = useState(data[0].name);

  const onDropdownOpenedHandle = () => {
    setDropdownOpened((dropdownOpened) => !dropdownOpened);
  };

  const onItemPressHandler = (option: string, action: () => void) => {
    setChosen(option);
    setDropdownOpened(false);
    action();
  };

  return (
    <TouchableWithoutFeedback onPress={onDropdownOpenedHandle}>
      <View style={[styles.selector, { backgroundColor: theme.listItemBG }, style]}>
        <View style={styles.textWrapper}>
          <BlueText fs={globalStyles.MAIN_FS} style={styles.dropdownItemText}>
            {chosen}
          </BlueText>
        </View>
        <View style={styles.iconWrapper}>
          <ButtonIcon
            variant={dropdownOpened ? 'down' : 'up'}
            size={globalStyles.ICON_SM_SIZE}
            onPress={onDropdownOpenedHandle}
          />
        </View>
        {dropdownOpened && (
          <View style={[styles.dropdownMenu, { backgroundColor: theme.listItemBG }]}>
            {data.map((item, i) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                key={i}
                onPress={() => onItemPressHandler(item.name, item.action)}
              >
                <BlueText fs={globalStyles.MAIN_FS} style={styles.dropdownItemText}>
                  {item.name}
                </BlueText>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  style?: StyleProp<ViewStyle>;
  data: Array<{
    name: string;
    action: () => void;
  }>;
};
