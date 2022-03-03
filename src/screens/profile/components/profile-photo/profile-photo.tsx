import React, { useEffect, useState, VFC } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { createClient } from 'pexels';
import Constants from 'expo-constants';

import { ModalWrapper } from '~components/common/modal-wrapper';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import { ModalPhotoInner } from '../modal-photo-inner/modal-photo-inner';
import styles from './profile-photo.style';
import { AddPhoto } from './components/addPhoto/addPhoto';
import { Photo } from './components/photo/photo';

const client = createClient(Constants.manifest?.extra?.imageAPI);

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
    if (newPhoto.length) {
      dispatch(authThunks.userUploadPhotoThunk(newPhoto));
    }

    onCloseModal();
  };

  return (
    <>
      <View style={styles.photoWrapper}>
        <View style={styles.photo}>
          {avatar || tempPhoto ? (
            <Photo avatar={avatar} tempPhoto={tempPhoto} onModalOpen={onModalOpen} />
          ) : (
            <AddPhoto onModalOpen={onModalOpen} />
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
