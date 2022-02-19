import React, { useEffect, useState, VFC } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '~components/common/button';
import { BlueText } from '~components/common/text';
import authSelectors from '~store/auth/auth.selectors';
import { authThunks } from '~store/auth/thunks';
import { ModalWrapper } from '~components/common/modal-wrapper';
import styles from './profile-info.style';
import { ModalNameInner } from '../modal-name-inner/modal-name-inner';
import { ModalPhotoInner } from '../modal-photo-inner/modal-photo-inner';

export const ProflieInfo: VFC = () => {
  const dispatch = useDispatch();

  const name: string = useSelector(authSelectors.user).name;

  const [newName, setNewName] = useState<string>(name);
  const [newPhoto, setNewPhoto] = useState<string>('');
  const [isNameModalOpened, setIsNameModalOpened] = useState(false);
  const [isPhotoModalOpened, setIsPhotoModalOpened] = useState(false);
  const [isPasswordModalOpened, setIsPasswordModalOpened] = useState(false);

  useEffect(() => {
    setNewName(name);
  }, [name]);

  const openNameModal = () => {
    setIsNameModalOpened(true);
  };

  const closeNameModal = () => {
    setIsNameModalOpened(false);
    setNewName(name);
  };

  const openPhotoModal = () => {
    setIsPhotoModalOpened(true);
  };

  const closePhotoModal = () => {
    setIsPhotoModalOpened(false);
    setNewPhoto('');
  };

  const openPasswordModal = () => {
    setIsPasswordModalOpened(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpened(false);
  };

  const onNameModalConfirm = () => {
    if (name !== newName) {
      dispatch(authThunks.userChangeNameThunk(newName));
    }
    closeNameModal();
  };

  const onPhotoModalConfirm = () => {
    if (newPhoto) {
      dispatch(authThunks.userUploadPhotoThunk(newPhoto));
    }
    closePhotoModal();
  };

  return (
    <>
      <View style={styles.infoWrapper}>
        <BlueText style={styles.name}>{name ?? 'User'}</BlueText>
        <View style={styles.buttons}>
          <Button name="Change name" style={styles.button} onPress={openNameModal} />
          <Button name="Change photo" style={styles.button} onPress={openPhotoModal} />
          <Button name="Change password" style={styles.button} />
        </View>
      </View>
      <ModalWrapper
        showModal={isNameModalOpened}
        confirm={onNameModalConfirm}
        decline={closeNameModal}
        text="Changing name"
      >
        <ModalNameInner name={newName} onChange={setNewName} />
      </ModalWrapper>
      <ModalWrapper
        showModal={isPhotoModalOpened}
        confirm={onPhotoModalConfirm}
        decline={closePhotoModal}
        text="Changing photo"
      >
        <ModalPhotoInner setNewPhoto={setNewPhoto} />
      </ModalWrapper>
    </>
  );
};
