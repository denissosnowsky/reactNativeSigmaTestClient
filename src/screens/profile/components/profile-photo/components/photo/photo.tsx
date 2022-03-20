import React, { VFC } from 'react';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';

import { ButtonIcon } from '~components/common/button-icon';
import globalStyles from '~global/constants.style';
import styles from './photo.style';

export const Photo: VFC<Props> = ({ avatar, tempPhoto, onModalOpen }) => {
  return (
    <View style={styles.imageWrapper}>
      <Image
        style={styles.image}
        source={{
          uri: avatar ? avatar : tempPhoto ? tempPhoto : '',
        }}
      />
      <TouchableWithoutFeedback onPress={onModalOpen}>
        <View style={styles.edit}>
          <Text style={styles.editText}>Change photo</Text>
          <ButtonIcon variant="pencil" onPress={onModalOpen} size={globalStyles.ICON_EXSM_SIZE} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

type Props = {
  avatar: string;
  tempPhoto: string;
  onModalOpen: () => void;
};
