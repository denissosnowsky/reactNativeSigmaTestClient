import { Select } from 'native-base';
import React, { useContext, useState, VFC } from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';

import { ThemeContext } from '~contexts';
import { IconsNames } from '~types/todo.types';
import globalStyles from '~global/constants.style';
import styles from './selector.style';
import { ButtonIcon } from '../button-icon';

export const Selector: VFC<Props> = ({ style, optionsArray }) => {
  const theme = useContext(ThemeContext);
  const [service, setService] = React.useState(optionsArray[0] && optionsArray[0].name);

  return (
    <View style={styles.wrapper}>
      {optionsArray.length > 0 && (
        <Select
          selectedValue={service}
          onValueChange={(itemValue) => {
            setService(itemValue);
            const selectionIndex = optionsArray.findIndex((item, i) => item.name === itemValue);
            optionsArray[selectionIndex].action();
          }}
          fontSize={17}
          borderColor={globalStyles.LIGHT_BORDER_COLOR}
          backgroundColor={theme.listItemBG}
          _selectedItem={{
            bg: '#bbb',
          }}
        >
          {optionsArray.map((item, i) => (
            <Select.Item
              label={item.name}
              value={item.name}
              key={i}
              leftIcon={<ButtonIcon variant={item.icon} size={globalStyles.ICON_EXSM_SIZE} />}
            />
          ))}
        </Select>
      )}
    </View>
  );
};

type Props = {
  style?: StyleProp<ViewStyle>;
  optionsArray: Array<{
    name: string;
    icon: IconsNames;
    action: () => void;
  }>;
};
