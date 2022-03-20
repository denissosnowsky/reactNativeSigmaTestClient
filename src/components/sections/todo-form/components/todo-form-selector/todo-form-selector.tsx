import { Select } from 'native-base';
import React, { useContext, VFC } from 'react';
import { View } from 'react-native';

import { ThemeContext } from '~contexts';
import { IconsNames } from '~types/todo.types';
import globalStyles from '~global/constants.style';
import { ButtonIcon } from '~components/common/button-icon';
import styles from './todo-form-selector.style';

export const TodoFormSelector: VFC<Props> = ({ optionsArray, initName }) => {
  const theme = useContext(ThemeContext);
  const [service, setService] = React.useState<IconsNames>(initName);

  return (
    <View style={styles.wrapper}>
      {optionsArray.length > 0 && (
        <Select
          selectedValue={service}
          onValueChange={(itemValue) => {
            setService(itemValue as IconsNames);
            const selectionIndex = optionsArray.findIndex((item, i) => item.name === itemValue);
            optionsArray[selectionIndex].action();
          }}
          fontSize={17}
          borderColor={globalStyles.LIGHT_BORDER_COLOR}
          backgroundColor={theme.listItemBG}
        >
          {optionsArray.map((item, i) => (
            <Select.Item
              label={item.name}
              value={item.name}
              key={i}
              leftIcon={<ButtonIcon variant={item.icon} size={globalStyles.ICON_EXSM_SIZE} />}
            />
          ))}
          <Select.Item
            label={initName}
            value={initName}
            leftIcon={<ButtonIcon variant={initName} size={globalStyles.ICON_EXSM_SIZE} />}
            display="none"
          />
        </Select>
      )}
    </View>
  );
};

type Props = {
  initName: IconsNames;
  optionsArray: Array<{
    name: string;
    icon: IconsNames;
    action: () => void;
  }>;
};
