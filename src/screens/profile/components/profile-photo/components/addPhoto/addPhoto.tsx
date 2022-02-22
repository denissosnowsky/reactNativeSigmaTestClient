import React, { VFC } from 'react';
import { TouchableWithoutFeedback, View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import { BlueText } from '~components/common/text';
import styles from './addPhoto.style';

export const AddPhoto: VFC<Props> = ({ onModalOpen }) => {
  return (
    <TouchableWithoutFeedback onPress={onModalOpen}>
      <View style={styles.addAvatar}>
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
