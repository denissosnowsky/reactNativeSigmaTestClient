import React, { useContext, VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import { BlueText } from '~components/common/text';
import { ThemeContext } from '~contexts';
import styles from './addPhoto.style';

export const AddPhoto: VFC<Props> = ({ onModalOpen }) => {
  const theme = useContext(ThemeContext);
  return (
    <TouchableWithoutFeedback onPress={onModalOpen}>
      <View style={[styles.addAvatar, { backgroundColor: theme.tabBarBG }]}>
        <BlueText fs={30}>Add avatar</BlueText>
        <ButtonIcon
          variant="add"
          style={styles.addButton}
          size={55}
          hasOpacity={false}
          onPress={onModalOpen}
        />
      </View>
    </TouchableWithoutFeedback>
  );
};

type Props = {
  onModalOpen: () => void;
};
