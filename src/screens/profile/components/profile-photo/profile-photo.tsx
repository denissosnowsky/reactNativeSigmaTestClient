import React, { useState, VFC } from 'react';
import { Image, TouchableWithoutFeedback, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Constants from 'expo-constants';

import { ButtonIcon } from '~components/common/button-icon';
import { ModalWrapper } from '~components/common/modal-wrapper';
import { BlueText } from '~components/common/text';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import { ModalPhotoInner } from '../modal-photo-inner/modal-photo-inner';
import styles from './profile-photo.style';

export const ProfilePhoto: VFC = () => {
  const dispatch = useDispatch();
  const avatar = useSelector(authSelectors.user).photo;
  const tempPhoto = useSelector(authSelectors.tempPhoto);

  const [isModalOpened, setIsModalOpened] = useState(false);
  const [newPhoto, setNewPhoto] = useState<string>('');

  const onModalOpen = () => {
    setIsModalOpened(true);
  };

  const onCloseModal = () => {
    setIsModalOpened(false);
    setNewPhoto('');
  };

  const onModalConfirm = () => {
    if (newPhoto) {
      dispatch(authThunks.userUploadPhotoThunk(newPhoto));
    }
    onCloseModal();
  };

  return (
    <>
      <View style={styles.photoWrapper}>
        <View style={styles.photo}>
          {avatar || tempPhoto ? (
            <Image
              style={styles.image}
              source={{
                uri: avatar
                  ? `${Constants.manifest?.extra?.storage_url}${avatar}`
                  : tempPhoto
                  ? tempPhoto
                  : '',
              }}
            />
          ) : (
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
          )}
        </View>
      </View>
      <ModalWrapper
        showModal={isModalOpened}
        confirm={onModalConfirm}
        decline={onCloseModal}
        text="Adding photo"
      >
        <ModalPhotoInner setNewPhoto={setNewPhoto} />
      </ModalWrapper>
    </>
  );
};
