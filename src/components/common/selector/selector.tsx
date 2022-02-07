import React, { useContext, useState, VFC } from 'react';
import { StyleProp, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';

import { ThemeContext } from '~contexts';
import { IconsNames } from '~types/todo.types';
import { SelectorOption } from './components/selector-option';
import { SelectorOptionDefault } from './components/selector-option-default';
import styles from './selector.style';

export const Selector: VFC<Props> = ({ style, optionsArray }) => {
  const theme = useContext(ThemeContext);
  const [dropdownOpened, setDropdownOpened] = useState(false);
  const [chosenOptionName, setChosenOptionName] = useState(optionsArray[0].name);

  const onDropdownOpenedHandle = () => {
    setDropdownOpened((dropdownOpened) => !dropdownOpened);
  };

  const onItemPressHandler = (optionName: string, optionAction: () => void) => {
    setChosenOptionName(optionName);
    setDropdownOpened(false);
    optionAction();
  };

  return (
    <TouchableWithoutFeedback onPress={onDropdownOpenedHandle}>
      <View style={styles.wrapper}>
        <SelectorOptionDefault
          chosenOptionName={chosenOptionName}
          dropdownOpened={dropdownOpened}
          onDropdownOpenedHandle={onDropdownOpenedHandle}
          style={style}
        />
        {dropdownOpened && (
          <View style={[styles.dropdownMenu, { backgroundColor: theme.listItemBG }]}>
            {optionsArray.map((item, i) => (
              <SelectorOption
                key={i}
                onPress={() => onItemPressHandler(item.name, item.action)}
                iconVariant={item.icon}
                text={item.name}
              />
            ))}
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
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
